<template>
    <!-- 登录背景 -->
    <div class="login-bg">
        <!-- 小星星 -->
        <div class="stars"></div>
        <!-- 中间登录的div   -->
        <slot/>
        <div class="login-footer">Powered By SCX @2018-2023</div>
    </div>
</template>
<script setup>

</script>
<style scoped>
/*登录主背景*/
.login-bg {
    background: radial-gradient(ellipse, transparent, #000000);
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    perspective: 340px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: login-bg 60s linear infinite;
}


@keyframes login-bg {
    0% {
        background-color: #050526;
    }
    25% {
        background-color: #002e20;
    }
    50% {
        background-color: #300030;
    }
    75% {
        background-color: #1e0044;
    }
    100% {
        background-color: #050526;
    }

}

.stars {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    border-radius: 50%;
    height: 2px;
    box-shadow: 316px -155px #e6e6e6, 237px 174px #dbdbdb, -1386px 93px #c2c2c2, 67px -331px #c9c9c9, 716px -297px #f7f7f7, -562px 99px #e6e6e6, -126px -19px #d1d1d1, -585px 94px #f2f2f2, 1295px 47px #f7f7f7, -732px 373px #d6d6d6, -587px -106px #e0e0e0, -593px -293px #f0f0f0, 810px -466px #dedede, -786px -288px #ededed, 1269px 447px #e8e8e8, -386px 435px #dedede, -812px 392px #c7c7c7, 358px -21px #c9c9c9, 1144px -16px #d4d4d4, 786px -50px #cfcfcf, 395px -72px #fafafa, 966px -361px #d9d9d9, 1467px -371px #d4d4d4, 260px 408px #c2c2c2, 337px 199px #d9d9d9, 631px -158px #dedede, 272px -65px #d9d9d9, -1004px 344px #c9c9c9, -47px 26px #e0e0e0, 580px 138px #f2f2f2, -1017px 363px #fafafa, 1393px 447px #fcfcfc, -389px -236px #cccccc, 1290px 268px #fafafa, -1424px -232px #e8e8e8, 401px -10px #e6e6e6, -1020px 380px #dbdbdb, -45px -127px #fafafa, -1384px -457px #e3e3e3, -1033px -230px #e3e3e3, 1385px -159px #c7c7c7, 1171px 261px #ebebeb, 77px 286px #f2f2f2, 158px -138px #f7f7f7, 960px 190px #dedede, 1110px 153px #c2c2c2, 710px -298px #d9d9d9, -230px 413px #e8e8e8, -460px 253px #d4d4d4, -840px 199px #cccccc, -405px -294px #fcfcfc, 1034px 172px #d6d6d6, -901px 407px #ededed, 942px 81px white, 1156px 386px #e0e0e0, 79px -453px #c7c7c7, 562px 220px #cfcfcf, 527px -93px #c4c4c4, -509px 87px #d6d6d6, 143px -179px #f7f7f7, -558px 141px #d4d4d4, 191px -377px #cccccc, -1380px 68px #c2c2c2, 172px 285px #c4c4c4, -1403px -48px #ebebeb, -410px -11px #c4c4c4, -555px -8px #fcfcfc, 1429px 292px #cccccc, -658px -270px #fafafa, 748px 325px #c4c4c4, -1409px 391px #f0f0f0, 214px 82px #f2f2f2, 589px 411px white, -511px 67px #f2f2f2, -1375px 325px #c2c2c2, -1389px 225px #e8e8e8, 788px -447px #e0e0e0, 737px 250px #fafafa, 764px 45px #c2c2c2, 1382px 477px #d9d9d9, -1071px -280px whitesmoke, 1296px -137px #e3e3e3, 822px 301px #e3e3e3, 206px 222px #cccccc, 286px -262px white, 247px 59px #e0e0e0, 1224px -415px #d1d1d1, -155px 100px #c7c7c7, 471px -108px #fafafa, -1095px 255px #c2c2c2, 655px -350px #c7c7c7, 193px 38px #ededed, -156px -323px #cfcfcf, -890px -15px #d6d6d6, 1485px 373px #d4d4d4, -1486px 228px #dbdbdb, -465px 228px #e0e0e0, -83px -151px #e8e8e8, -198px -3px #d1d1d1, -1207px 72px whitesmoke, 492px 472px #ededed, 879px 322px #d4d4d4, 1425px -371px #ededed, -29px -207px #e3e3e3, -863px 343px #cccccc, 282px -415px #f0f0f0, -851px -120px #c4c4c4, 1142px -421px #d6d6d6, 1212px -134px #e0e0e0, -1277px -264px #e3e3e3, 557px 208px #f7f7f7, -328px -315px #c9c9c9, 988px 317px #f2f2f2, -1237px 267px #dedede, 1022px -468px #dedede, 654px -224px #f7f7f7, 1127px 199px #e8e8e8, -355px -181px #fcfcfc, -242px -398px white, 1321px -106px #f0f0f0, 119px 343px #e8e8e8, -958px -235px #f7f7f7, 937px 392px #d1d1d1, -885px -320px #d1d1d1, 1192px 341px #e6e6e6, -399px 77px whitesmoke, 1439px 20px #d1d1d1, -1224px 130px #e0e0e0, 430px 50px #c9c9c9, -673px 206px #c9c9c9, 1489px -5px whitesmoke, -833px 51px #f2f2f2, -476px -188px white, 747px -298px #f0f0f0, -259px -411px #c9c9c9, 351px 448px #e0e0e0, -119px -183px #cfcfcf, -1192px 114px #c4c4c4, 1391px 255px #dbdbdb, 401px 50px #c4c4c4, -497px 407px #dbdbdb, -1243px -402px #c4c4c4, -196px -70px #d6d6d6, -1494px -160px #d9d9d9, 1382px 247px #e0e0e0, 415px 190px #dbdbdb, -1112px -250px #d9d9d9, 552px -66px #c7c7c7, 379px -265px #e0e0e0, -1109px -104px #ededed, -119px 161px #d4d4d4, -1270px 223px #c4c4c4, 107px -246px #f7f7f7, -41px -37px #cccccc, 795px -134px #d1d1d1, 1238px 451px #f0f0f0, -323px 269px #d6d6d6, 982px -85px #c7c7c7, 1106px -65px #ebebeb, 1151px -90px #e8e8e8, -483px 276px #dbdbdb, 45px 146px #cfcfcf, 1087px 221px #d4d4d4, 1157px -182px #f7f7f7, 715px -171px #fcfcfc, -810px 408px #e0e0e0, -130px -105px #d4d4d4, -258px 187px #fcfcfc, 887px 39px #d9d9d9, 290px -207px #f0f0f0, -1449px -472px #d1d1d1, 1396px -87px whitesmoke, -1166px -91px #c9c9c9, 916px -294px white, -1439px -265px #ededed, 1069px -308px #c9c9c9, 1166px -299px #ebebeb, 934px -474px #dbdbdb, 368px 108px #cfcfcf, -84px -156px #dbdbdb, -670px -24px #c7c7c7, 260px -95px #c2c2c2, 1131px 465px #ebebeb, -577px -2px #d4d4d4, -104px -220px #d6d6d6, 1195px 431px #ebebeb, -809px -141px #e0e0e0, 1432px -38px #c4c4c4, -1300px -268px #f7f7f7, -200px -414px #ebebeb, -1123px 476px #d9d9d9, 223px -18px #cccccc, 643px -44px whitesmoke, 1306px 289px #cfcfcf, -736px 142px #d4d4d4, -416px 283px #f2f2f2, 511px 203px #c4c4c4, 1240px 396px #c2c2c2, -138px -126px #ebebeb, 714px 447px #c4c4c4, -1395px -368px #e6e6e6, 715px -241px #e0e0e0, -438px -245px #d4d4d4, -995px 82px #fafafa, -951px 366px #d4d4d4, -1110px -438px whitesmoke, -74px 120px #e0e0e0, 1467px -281px #d1d1d1, 317px -425px #dbdbdb, 1018px 365px #c7c7c7, -45px -189px #c4c4c4, 1497px 165px white, -133px 246px #f7f7f7, 401px 127px #e3e3e3, -185px 42px #f0f0f0, 55px 222px #fafafa, -900px -153px #f2f2f2, 419px -266px #d1d1d1, 274px 203px #ededed, 530px 217px white, -1015px -142px #cccccc, -389px -201px #fafafa, -367px -156px #d9d9d9, -961px -273px #c7c7c7, -1289px 335px #f7f7f7, 1412px 167px #d9d9d9, -93px 465px #d4d4d4, 200px 285px #e3e3e3, 414px -345px #ededed, -935px 88px #e0e0e0, 139px -26px #f0f0f0, 771px 453px #dedede, 1275px 179px whitesmoke, 937px -421px whitesmoke, -673px 248px #fcfcfc, 413px -421px #d1d1d1, 955px -110px #d9d9d9, -1223px 293px #d1d1d1, -60px 47px #e0e0e0, -765px 407px #cfcfcf, -762px -314px whitesmoke, -404px 443px #f7f7f7, -1426px 105px whitesmoke, 1px 424px #dbdbdb, -707px -158px #ededed, -332px -376px #e8e8e8, -395px -30px #c9c9c9, 693px 393px #c4c4c4, -905px -325px #c4c4c4, -878px -392px #e6e6e6, -571px 360px #d4d4d4, 233px 154px #c9c9c9, -1133px 371px #cccccc, 1131px 388px #c4c4c4, -1093px -397px #d6d6d6, -837px 110px #e6e6e6, 891px 6px #e0e0e0, 607px -129px #d1d1d1, 415px 43px #d4d4d4, -886px -105px #d1d1d1, -1431px 225px #e8e8e8, 27px -257px #e0e0e0, 1058px 297px #fcfcfc, -1020px 27px #f2f2f2, -1387px -28px #e0e0e0, 151px 434px #fcfcfc, -1046px 170px #d4d4d4, -1261px -296px #f2f2f2, -1391px 325px #e8e8e8, -389px 133px #e3e3e3, -1302px 277px #c9c9c9, 691px 351px #e8e8e8, 364px 3px #cccccc, -836px 68px #cccccc, 301px 175px #dedede, -760px -13px #e6e6e6, 661px -432px #c4c4c4, -922px -447px #d4d4d4, 258px 376px #ebebeb, -124px -165px #fafafa, -146px 428px #e0e0e0, -83px -264px #d9d9d9, -1264px -245px #c4c4c4, 172px -245px #d1d1d1, 548px -306px #dedede, 1319px -194px #ededed, 1077px 185px #e3e3e3, -107px -280px #d4d4d4, -1066px -420px #e3e3e3, 776px 215px whitesmoke, -657px 322px #c7c7c7, 508px -75px #d9d9d9, -498px -39px #f7f7f7, 535px -149px #c2c2c2, 182px 274px #f7f7f7, -1321px -212px #c7c7c7, 849px -408px #fcfcfc, -801px 96px #c2c2c2, -1111px -399px #d9d9d9, -1336px 465px #cfcfcf, -1131px 405px #d9d9d9, 872px -387px #d4d4d4, -1307px -92px #f7f7f7, 1416px 124px #ededed, -1176px -250px #d6d6d6, 164px -165px #e3e3e3, -1202px -40px #cccccc, 95px 478px #cccccc, -501px -384px #ebebeb, -1385px -255px #e3e3e3, -628px 214px #e0e0e0, -888px -470px #d4d4d4, 963px -444px #c4c4c4, -1068px -317px #c7c7c7, -694px 9px #e6e6e6, 983px 374px #f0f0f0, 1217px -43px #ededed, 744px -212px #c9c9c9, 605px -383px white, 43px 108px #e0e0e0, 965px -43px #cccccc, -1335px 265px white, -1330px -296px #f0f0f0, -1042px -247px whitesmoke, 964px 326px #c9c9c9, 1144px -267px white, -1329px -401px #cfcfcf, 628px 444px #c9c9c9, 1409px 240px #f0f0f0, 1174px 257px #d6d6d6, -1326px -68px #d4d4d4, -519px -331px #d4d4d4, 305px -189px #e6e6e6, -678px 434px white, 1381px -382px #f7f7f7, 11px -325px #d1d1d1, 145px 194px #ebebeb, 224px 214px #f7f7f7, -893px 421px #dbdbdb, -339px -383px #dbdbdb, -845px -20px #ebebeb, 1122px 297px #d6d6d6, 926px -475px #c7c7c7, 232px 105px #d6d6d6, -165px -380px #f0f0f0, -770px 43px #c9c9c9, -1400px -234px #c9c9c9, 1264px 339px #ededed, -781px -371px #f2f2f2, -1227px -192px #cccccc, 1218px 131px #e6e6e6;
    animation: fly 30s linear infinite;
    transform-style: preserve-3d;
}


@keyframes fly {
    from {
        transform: translateZ(0px);
    }
    to {
        transform: translateZ(300px);
    }
}

.stars:before, .stars:after {
    content: "";
    position: absolute;
    width: inherit;
    height: inherit;
    box-shadow: inherit;
}

.stars:before {
    transform: translateZ(-300px);
    animation: fade1 10s linear infinite;
}

.stars:after {
    transform: translateZ(-600px);
    animation: fade2 10s linear infinite;
}

@keyframes fade1 {
    from {
        opacity: .5;
    }
    to {
        opacity: 1;
    }
}

@keyframes fade2 {
    from {
        opacity: 0;
    }
    to {
        opacity: .5;
    }
}

/*右下角标识*/
.login-footer {
    position: fixed;
    bottom: 1%;
    right: 1%;
    color: rgba(120, 120, 120, 0.1);
    transition: all 0.5s ease-out;
}

.login-footer:hover {
    color: rgba(255, 255, 255, 0.5)
}
</style>
