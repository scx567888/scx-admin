<template>
    <div class="qr-code">
        <!-- 用于读取流数据 不会在界面中显示 -->
        <video ref="videoRef" style="display: none"></video>
        <!-- 用来绘制 -->
        <canvas ref="canvasRef" style="max-width: 100%"></canvas>
    </div>
</template>

<script>
import {onMounted, ref} from "vue";
import jsQR from "jsqr";

export default {
    name: "qr-code",
    props: {
        /**
         * 是否使用前置摄像头
         */
        front: {
            type: Boolean,
            default: false
        },
        /**
         * 是否暂停
         */
        pause: {
            type: Boolean,
            default: false
        }
    },
    setup(props, context) {

        const canvasRef = ref(null);
        const videoRef = ref(null);

        let canvas = null;
        let video = null;

        //画线 用于框出二维码的区域
        function drawLine(color, pointArr) {
            canvas.beginPath();
            for (let i = 0; i < pointArr.length; i++) {
                const p = pointArr[i];
                if (i === 0) {
                    canvas.moveTo(p.x, p.y);
                } else {
                    canvas.lineTo(p.x, p.y);
                }
            }
            canvas.closePath();
            canvas.lineWidth = 4;
            canvas.strokeStyle = color;
            canvas.stroke();
        }

        //检测图片中是否有 二维码
        function hasQRCode(imageData) {
            const code = jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: "dontInvert",
            });
            if (code) {
                drawLine("#fe0953", [
                    code.location.topLeftCorner,
                    code.location.topRightCorner,
                    code.location.bottomRightCorner,
                    code.location.bottomLeftCorner
                ]);
                // drawLine(code.location.topRightCorner, , "#fe0953");
                // drawLine(code.location.bottomRightCorner, , "#fe0953");
                // drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#fe0953");
                context.emit("hasQRCode", code.data);
            }
        }

        //向画布中绘制
        function drawToCanvas(callBack) {
            if (!props.pause && video.readyState === video.HAVE_ENOUGH_DATA) {
                canvasRef.value.height = video.videoHeight;
                canvasRef.value.width = video.videoWidth;
                canvas.drawImage(video, 0, 0);
                if (callBack) {//有回调执行回调
                    const imageData = canvas.getImageData(0, 0, canvasRef.value.width, canvasRef.value.height);
                    callBack(imageData);
                }
            }
            requestAnimationFrame(() => drawToCanvas(callBack));
        }

        //初始化
        function init() {
            canvas = canvasRef.value.getContext("2d");
            video = videoRef.value;
            const constraints = {
                video: {facingMode: props.front ? "user" : "environment"}
            };
            navigator.mediaDevices.getUserMedia(constraints).then(stream => {
                video.srcObject = stream;
                video.play();
                drawToCanvas(hasQRCode);
            }).catch(e => {
                console.error(e);
                alert("未找到设备 请确保使用 https 访问并开启摄像头权限 !!!");
            });
        }

        onMounted(() => init());

        return {
            canvasRef,
            videoRef
        };

    }
};
</script>

<style scoped>
.qr-code {
    min-height: 300px;
    width: 300px;
    border: 1px solid red;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
