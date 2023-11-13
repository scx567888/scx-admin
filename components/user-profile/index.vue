<template>

    <div class="user-profile">
        <easy-upload v-model="userInfo.avatar" :before-delete="removeAvatar" :upload-handler="upload"/>

        <slot name="info">
            <el-descriptions :column="1" border>
                <el-descriptions-item align="center" label="用户名" label-align="center" width="150px">
                    {{ userInfo.username }}
                </el-descriptions-item>
            </el-descriptions>
        </slot>

        <el-divider/>
        <div>
            <el-button plain type="primary" @click="showChangeUsername">点击修改用户名</el-button>
            <el-button plain type="success" @click="showChangePassword">点击修改密码</el-button>
        </div>
    </div>

    <el-dialog v-model="changeUsernameDialogVisible" :close-on-click-modal="false" :close-on-press-escape="false"
               :width="dialogWidth" title="修改用户名">
        <el-form ref="changeUsernameRef" :model="changeUsernameForm" label-width="120px">
            <easy-form-item label="新用户名" prop="newUsername" required>
                <el-input v-model="changeUsernameForm.newUsername"></el-input>
            </easy-form-item>
            <easy-form-item label="密码" prop="password" required>
                <el-input v-model="changeUsernameForm.password" show-password></el-input>
            </easy-form-item>
        </el-form>
        <span>注意 : 请牢记修改后的用户名, 忘记请联系管理员进行找回!!!</span>
        <template #footer>
            <el-button @click="changeUsernameDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="changeUsername">确认修改</el-button>
        </template>
    </el-dialog>

    <el-dialog v-model="changePasswordDialogVisible" :close-on-click-modal="false" :close-on-press-escape="false"
               :width="dialogWidth" title="修改密码">
        <el-form ref="changePasswordRef" :model="changePasswordForm" label-width="100px">
            <easy-form-item label="原密码" prop="password" required>
                <el-input v-model="changePasswordForm.password" show-password></el-input>
            </easy-form-item>
            <easy-form-item label="新密码" prop="newPassword" required>
                <el-input v-model="changePasswordForm.newPassword" show-password></el-input>
            </easy-form-item>
            <el-form-item :rules="newPassword2Rules" label="确认密码" prop="newPassword2">
                <el-input v-model="changePasswordForm.newPassword2" show-password></el-input>
            </el-form-item>
        </el-form>
        <span>注意 : 请牢记修改后的密码, 忘记请联系管理员进行找回!!!</span>
        <template #footer>
            <el-button @click="changePasswordDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="changePassword">确认修改</el-button>
        </template>
    </el-dialog>


</template>

<script>
import {reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import {useScxFSS, useScxReq, useScxUserInfo} from "scx-ui/vue-component";

export default {
    name: "user-profile",
    props: {
        dialogWidth: {
            default: "400px"
        },
    },
    setup() {

        const fss = useScxFSS();
        const req = useScxReq();
        const userInfo = useScxUserInfo();

        const changeUsernameForm = reactive({
            newUsername: "",
            password: ""
        });

        const changePasswordForm = reactive({
            password: "",
            newPassword: "",
            newPassword2: ""
        });

        const changeUsernameDialogVisible = ref(false);
        const changePasswordDialogVisible = ref(false);

        const changeUsernameRef = ref();
        const changePasswordRef = ref();

        const newPassword2Rules = [{
            type: "string",
            trigger: "blur",
            required: true,
            validator: (rule, value, callback) => {
                if (value.trim() === "") {
                    return callback("请再次输入密码 !!!");
                } else if (changePasswordForm.newPassword !== value) {
                    callback("两次密码不一致 !!!");
                } else {
                    callback();
                }
            }
        }];

        function showChangeUsername() {
            changeUsernameForm.newUsername = userInfo.username;
            changeUsernameForm.password = "";
            changeUsernameDialogVisible.value = true;
        }

        function showChangePassword() {
            changePasswordForm.newPassword = "";
            changePasswordForm.password = "";
            changePasswordForm.newPassword2 = "";
            changePasswordDialogVisible.value = true;
        }

        function changeUsername() {
            changeUsernameRef.value.validate((valid) => {
                if (valid) {
                    req.post("api/auth/change-username-by-self", {
                        newUsername: changeUsernameForm.newUsername,
                        password: changeUsernameForm.password
                    }).then(data => {
                        userInfo.username = data.username;
                        ElMessage.success("修改用户名成功 !!! 下次登录请使用新用户名 !!!");
                        changeUsernameDialogVisible.value = false;
                    }).catch(e => {
                        if (e.message === "username-already-exists") {
                            ElMessage.error("用户名已被占用 !!!");
                        } else if (e.message === "wrong-password") {
                            ElMessage.error("密码错误 !!!");
                        } else {
                            ElMessage.error("修改用户名失败 !!! 请稍后再试 !!!");
                            console.error(e);
                        }
                    });
                }
            });
        }

        function changePassword() {
            changePasswordRef.value.validate((valid) => {
                if (valid) {
                    req.post("api/auth/change-password-by-self", {
                        newPassword: changePasswordForm.newPassword,
                        oldPassword: changePasswordForm.password
                    }).then(data => {
                        ElMessage.success("修改密码成功 !!! 下次登录请使用新密码 !!!");
                        changePasswordDialogVisible.value = false;
                    }).catch(e => {
                        if (e.message === "wrong-password") {
                            ElMessage.error("密码错误 !!!");
                        } else {
                            ElMessage.error("修改密码失败 !!! 请稍后再试 !!!");
                        }
                    });
                }
            });
        }

        function upload(e) {
            return new Promise((resolve, reject) => {
                fss.upload(e).then(data => {
                    req.post("api/auth/change-user-avatar", {newAvatar: data.item.fssObjectID}).then(data => {
                        userInfo.avatar = data.avatar;
                        resolve(userInfo.avatar);
                        ElMessage.success("修改头像成功 !!!");
                    }).catch(e => {
                        ElMessage.error("修改头像失败 !!!");
                    });
                });
            });
        }

        function removeAvatar(e) {
            return new Promise((resolve, reject) => {
                req.post("api/auth/change-user-avatar", {newAvatar: ""}).then(data => {
                    resolve(true);
                    ElMessage.success("移除头像成功 !!!");
                }).catch(e => {
                    ElMessage.error("移除头像失败 !!!");
                });
            });
        }

        return {
            changeUsernameRef,
            changePasswordRef,
            userInfo,
            changePasswordDialogVisible,
            changeUsernameForm,
            changeUsernameDialogVisible,
            showChangeUsername,
            showChangePassword,
            upload,
            newPassword2Rules,
            changeUsername,
            changePasswordForm,
            changePassword,
            removeAvatar
        };
    }
};

</script>
<style scoped>
.user-profile {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-direction: column;
    row-gap: 10px;
}
</style>
