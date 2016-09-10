function changeHeaderColor() {
    for (var i = 1; i <= 13; i++) {
        var valueHeader = 'head' + i;
        var valueColor = ["#FDB4BF", "#ffbe7d", "#ffff88", "#a3e7d8", "#a4c8f0", "#B3B3D9", "#D0B3E1", "#FF9797"];
        var countColor = (i % 7) + 1;
        document.getElementById(valueHeader).style.color = valueColor[countColor];
        document.getElementById(valueHeader).style.fontSize = '85%';
    }
}
$("a[href='#popupCall']").click(function(){
    $("#popupCall").fadeIn(500);
}); 

//Function for Call Popup (Open)
function emergencySMS(){
    var number1 = localStorage.getItem("telphone1");
    var number2 = localStorage.getItem("telphone2");
    var number3 = localStorage.getItem("telphone3");
    var statusNumber1,statusNumber2,statusNumber3 = false;
    var statusNumber1
    if ((typeof number1 === 'undefined' ||  number1 === null || number1 == "")
        &&  (typeof number2 === 'undefined' ||  number2 === null || number2 == "")
        &&  (typeof number3 === 'undefined' ||  number3 === null || number3 == "")){
        var alertemer = function () {
            window.location.href = "userinfo.html"
        }
        navigator.notification.alert(
            'กรุณาตั้งค่าเบอร์ฉุกเฉิน',  // message
            alertemer,         // callback
            'แจ้งเตือน',            // title
            'ยืนยัน'                  // buttonName
        );
    }else{
        if (typeof number1 !== 'undefined' && number1 !== null){
            statusNumber1 = true;
        }
        if (typeof number2 !== 'undefined' && number2 !== null){
            statusNumber2 = true;
        }
        if (typeof number3 !== 'undefin่ed' && number3 !== null){
            statusNumber3 = true;
        }
        if(statusNumber1 == true){
            sendSMS(number1);
            if(number1 == number2){statusNumber2 = false;}
            if(number1 == number3){statusNumber3 = false;}
        }
        if(statusNumber2 == true){
            sendSMS(number2);
            if(number2 == number3){statusNumber3 = false;}
        }
        if(statusNumber3 == true){
            sendSMS(number3);
        }
        navigator.notification.alert(
            'ส่งข้อความเรียบร้อย',  // message
            alertemer,         // callback
            'แจ้งเตือน',            // title
            'ยืนยัน'                  // buttonName
        );  
        $('#popupCall').fadeOut(400); 
    }
}
function sendSMS(mobileno){
    var number = mobileno;
    var flname = localStorage.getItem("flname");
    if (typeof flname === 'undefined' || flname === null || flname || ""){
        flname = "";
    }
    else{
        flname += " ";
    }
    var message = flname+"ขอความช่วยเหลือ";    
    var valLat = sessionStorage.getItem("lat");
    var valLong = sessionStorage.getItem("long");
    if (typeof valLat !== 'undefined' || valLat !== null || typeof valLong !== 'undefined' || valLong !== null){
        var mapurl = 'maps.google.com/maps?q=loc:'+valLat+','+valLong;
        var mapstr = 'ดูแผนที่เพิ่มเติม : \n'+mapurl;
        message +=  '\n'+mapstr;
    }
    //CONFIGURATION
    var options = {
        replaceLineBreaks: true, // true to replace \n by a new line, false by default
        android: {
            // intent: 'INTENT'  // send SMS with the native android SMS messaging
            intent: '' // send SMS without open any other app
        }
    };
    var success = function () { 
        console.log('Message sent successfully'); 
    };
    var error = function (e) { 
        console.log('Message Failed:' + e); 
        navigator.notification.alert(
            number+' : ไม่สามารถส่งข้อความได้',  // message
            alertemer,         // callback
            'แจ้งเตือน',            // title
            'ยืนยัน'                  // buttonName
        );
    };
    sms.send(number, message, options, success, error);
}

function getCall(){
    var valueFlName = localStorage.getItem("flname");
    var valueMobileNo = localStorage.getItem("telphone");
    if (typeof valueFlName === 'undefined' || valueFlName ===null || valueFlName == ""){
        valueFlName = "กรุณาตั้งค่าชื่อ";
    }
    if (typeof valueMobileNo ==='undefined' || valueMobileNo === null || valueMobileNo == ""){
        valueMobileNo = "กรุณาตั้งค่าเบอร์โทรศัพท์";
    }
    $('#emname').text(valueFlName);
    $('#emphone').text(valueMobileNo);
}
function callSomeone(){ 
    var mobileno = localStorage.getItem("telphone");
    if(typeof mobileno == 'undefined' || mobileno == null){
        alert("กรุณาตั้งค่าเบอร์โทรศัพท์");
        $('#popupCall').fadeOut(500);
    }else{
        document.location.href = 'tel:'+mobileno;
    }
}
function callCancel() {
    $('#popupCall').fadeOut(500);    
}
//Function for Call Popup (Close)

//Function for Health Record Page (Open)
var db = openDatabase('healthrainbow', '1.0', 'Height and Weight Database', 2 * 1024 * 1024);
// healthrecord - bloodpressure(Open)

function saveSysDias(){
    var valueSys = $('#systolic').val();
    var valueDias = $('#diastolic').val();
    var valueDate = $('#hrbp-date').text();
    var valueTime = $('#hrbp-time').text();
    if(valueSys == "" && valueDias == "") {
        alert('กรุณากรอกค่า Systolic');
    }
    else if(valueDias == "") {
        alert('กรุณากรอกค่า Diastolic');
    }
    else{
        db.transaction(function (tx) {
            tx.executeSql('INSERT INTO sysdias (systolic, diastolic, datestamp, timestamp) VALUES ('+valueSys+','+valueDias+',"'+valueDate+'","'+valueTime+'")');
        });
        alert("บันทึกเรียบร้อย");
        window.location.href = "healthrecord.html";
    }
}
// healthrecord-bloodpressure (Close)

// healthrecord-heightweight (Open)
function save(){
    var valueHeight = $('#height').val();
    var valueWeight = $('#weight').val();
    var text1 ="กรุณากรอก "
    if(valueWeight == "" || valueHeight == ""){
        if(valueWeight == ""){
            text1 += "น้ำหนัก ";
        }
        if(valueHeight  == ""){
            text1 += "ส่วนสูง ";
        }
        alert(text1);
    }else {
        saveHWDB();
        // saveHWLocalStorage();
        alert("บันทึกเรียบร้อย");
        window.location.href = "detailstatus2.html";
    }
}

function saveHW() {
    var valueHeight = $('#height').val();
    var valueWeight = $('#weight').val();
    if(valueHeight == "" && valueWeight == "") {
        alert('กรุณากรอกค่าน้ำหนัก');
    }
    else if(valueHeight == "") {
        alert('กรุณากรอกค่าส่วนสูง');
    }
    else{
        saveHWDB();
        saveHWLocalStorage();
        alert("บันทึกเรียบร้อย");
        window.location.href = "healthrecord.html";
    }  
}

function saveHWLocalStorage() {
    var valueHeight = $('#height').val();
    var valueWeight = $('#weight').val();
    localStorage.setItem("height", valueHeight);
    localStorage.setItem("weight", valueWeight);
}

function saveHWDB(){
    var valueHeight = $('#height').val();
    var valueWeight = $('#weight').val();
    var valueDate = $('#hrhw-date').val();
    var valueTime = $('#hrhw-time').val();
    db.transaction(function (tx) {
        tx.executeSql('INSERT INTO heightweight (height, weight, datestamp, timestamp) VALUES ('+valueHeight+','+valueWeight+',"'+valueDate+'","'+valueTime+'")');
    });
}
//healthrecord-heightweight (Close)
//Function for Health Record Page (Close)

//Function for Notifications (Open)
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
function genNotiId(){
    // Generate Notification ID
    var notiId;
    var notiCount = localStorage.getItem("noticount");
    if (typeof notiCount !== 'undefined' && notiCount !== null){
        notiCount = parseInt(notiCount);
        notiId = notiCount+1;
    }else{
        notiId = 1;
    }
    localStorage.setItem("noticount",notiId);
    return notiId;
}
function saveMedNotification() {
    var medTitle = $('#medtitle').val(); //ชื่อยา
    var medAmount = $('#medamount').val(); //จำนวนยา (เม็ด)
    var medEat = $('input:radio[name=radio-choice-v-2]:checked').val(); //ก่อนอาหาร = 1 หลังอาหาร = 2
    var textEat;
    if(medEat==1){ textEat = 'ก่อนอาหาร'; }
    else if(medEat==2){ textEat = 'หลังอาหาร'; }
    var textNotiTitle = medTitle+' '+textEat+' จำนวนยา '+medAmount+' เม็ด';
    var timeTypeBefore = parseInt('-'+localStorage.getItem("timetypebefore"));
    var timeTypeAfter = localStorage.getItem("timetypeafter");
    var sunday = $('#sunday').prop('checked');
    var monday = $('#monday').prop('checked');
    var tuesday = $('#tuesday').prop('checked');
    var wednesday = $('#wednesday').prop('checked');
    var thursday = $('#thursday').prop('checked');
    var friday = $('#friday').prop('checked');
    var saturday = $('#saturday').prop('checked');
    var medTime1 = $('#checkbox-v-2a').is(":checked"); //เช้า
    var medTime2 = $('#checkbox-v-2b').is(":checked"); //กลางวัน
    var medTime3 = $('#checkbox-v-2c').is(":checked"); //เย็น
    var medTime4 = $('#checkbox-v-2d').is(":checked"); //ก่อนนอน
    var nowDateobj = new Date(); // Current Date and Time for Check
    var d1 = new Date();
    var d2 = new Date();
    var d3 = new Date();
    var d4 = new Date();
    var dateObj1 = new Date();
    var dateObj2 = new Date();
    var dateObj3 = new Date();
    var dateObj4 = new Date();
    var timestamp = $('#timetxt').text();
    // console.log('medtitle:'+medTitle+' medamount:'+medAmount+' medeat:'+medEat+' medtime1:'+medTime1+' medtime2:'+medTime2+
    //     ' medtime3:'+medTime3+' medtime4:'+medTime4);
    // console.log(timestamp);
    if(medTitle == ""){
        // alert("กรุณากรอกชื่อยา");
        navigator.notification.alert(
            'กรุณากรอกชื่อยา',  // message
            alertDismissed,         // callback
            'แจ้งเตือน',            // title
            'ยืนยัน'                  // buttonName
        );
        $('#medtitle').focus();
    }
    else if(medAmount == ""){
        navigator.notification.alert(
            'กรุณากรอกจำนวนยาที่รับประทาน',  // message
            alertDismissed,         // callback
            'แจ้งเตือน',            // title
            'ยืนยัน'                  // buttonName
        );
        // alert("กรุณากรอกจำนวนยาที่รับประทาน");
        $('#medamount').focus();
    }
    else if(medTime1==false&&medTime2==false&&medTime3==false&&medTime4==false){
        // alert("กรุณาเลือกเวลาเตือน");
        navigator.notification.alert(
            'กรุณาเลือกเวลาเตือน',  // message
            alertDismissed,         // callback
            'แจ้งเตือน',            // title
            'ยืนยัน'                  // buttonName
        );
    }
    else if(sunday==false&&monday==false&&tuesday==false&&wednesday==false&&thursday==false&&friday==false&&saturday==false){
        // alert("กรุณาเลือกวันเตือน");
        navigator.notification.alert(
            'กรุณาเลือกวันเตือน',  // message
            alertDismissed,         // callback
            'แจ้งเตือน',            // title
            'ยืนยัน'                  // buttonName
        );
    }
    else{
        if(medTime1==true){ //เช้า
            var textValue = localStorage.getItem("timebreakfast");
            var timeValue = textValue.split(":"); // [0]=hour [1]=min
            dateObj1.setHours(parseInt(timeValue[0]));
            dateObj1.setMinutes(parseInt(timeValue[1]));
            d1 = dateObj1;
            if(medEat==1){ //ก่อนอาหาร
                dateObj1 = dateAdd(dateObj1, 'minute', timeTypeBefore);
            }else if(medEat==2){ //หลังอาหาร
                dateObj1 = dateAdd(dateObj1, 'minute', timeTypeAfter);
            }
        }
        if(medTime2==true){ //กลางวัน
            var textValue = localStorage.getItem("timelunch");
            var timeValue = textValue.split(":"); // [0]=hour [1]=min
            dateObj2.setHours(parseInt(timeValue[0]));
            dateObj2.setMinutes(parseInt(timeValue[1]));
            d2 = dateObj2;
            if(medEat==1){ //ก่อนอาหาร
                dateObj2 = dateAdd(dateObj2, 'minute', timeTypeBefore);
            }else if(medEat==2){ //หลังอาหาร
                dateObj2 = dateAdd(dateObj2, 'minute', timeTypeAfter);
            }
        }
        if(medTime3==true){ //เย็น
            var textValue = localStorage.getItem("timedinner");
            var timeValue = textValue.split(":"); // [0]=hour [1]=min
            dateObj3.setHours(parseInt(timeValue[0]));
            dateObj3.setMinutes(parseInt(timeValue[1]));
            d3 = dateObj3;
            if(medEat==1){ //ก่อนอาหาร
                dateObj3 = dateAdd(dateObj3, 'minute', timeTypeBefore);
            }else if(medEat==2){ //หลังอาหาร
                dateObj3 = dateAdd(dateObj3, 'minute', timeTypeAfter);
            }
        }
        if(medTime4==true){ //ก่อนนอน
            var textValue = localStorage.getItem("timebed");
            var timeValue = textValue.split(":"); // [0]=hour [1]=min
            dateObj4.setHours(parseInt(timeValue[0]));
            dateObj4.setMinutes(parseInt(timeValue[1]));
            d4 = dateObj1;
            if(medEat==1){ //ก่อนอาหาร
                dateObj4 = dateAdd(dateObj4, 'minute', timeTypeBefore);
            }else if(medEat==2){ //หลังอาหาร
                dateObj4 = dateAdd(dateObj4, 'minute', timeTypeAfter);
            }
        }
        dateObj1.setSeconds(0);
        dateObj2.setSeconds(0);
        dateObj3.setSeconds(0);
        dateObj4.setSeconds(0);
        var currentDay = nowDateobj.getDay();
        var suntoset = 0,montoset = 1, tuestoset = 2,wedtoset = 3,thutoset = 4,fritoset = 5,sattoset = 6;
        var arrdaytoset = [suntoset,montoset,tuestoset,wedtoset,thutoset,fritoset,sattoset];
        var sunId1,sunId2,sunId3,sunId4;
        var monId1,monId2,monId3,monId4;
        var tuesId1,tuesId2,tuesId3,tuesId4;
        var wedId1,wedId2,wedId3,wedId4;
        var thuId1,thuId2,thuId3,thuId4;
        var friId1,friId2,friId3,friId4;
        var satId1,satId2,satId3,satId4;
        if(sunday==true){
            var daytoset = arrdaytoset[suntoset];
            var distance = (daytoset + 7 - currentDay) % 7;
            var sunObj1 = dateObj1;
            var sunObj2 = dateObj2;
            var sunObj3 = dateObj3;
            var sunObj4 = dateObj4;
            for(var i=0;i<arrdaytoset.length-1;i++){
                if(currentDay == arrdaytoset[i]){
                    if(sunObj1<nowDateobj){sunObj1 = dateAdd(sunObj1,'day',7);}
                    if(sunObj2<nowDateobj){sunObj2 = dateAdd(sunObj2,'day',7);}
                    if(sunObj3<nowDateobj){sunObj3 = dateAdd(sunObj3,'day',7);}
                    if(sunObj4<nowDateobj){sunObj4 = dateAdd(sunObj4,'day',7);}
                }
            }
            if(medTime1==true){
                var notiId = genNotiId();
                sunId1 = notiId;
                sunObj1.setDate(sunObj1.getDate() + distance);
                cordova.plugins.notification.local.schedule({
                  id: notiId,
                  title: 'Health Plus',
                  text: textNotiTitle,
                  at: sunObj1,
                  every: "week"
                });
            }
            if(medTime2==true){
                var notiId = genNotiId();
                sunId2 = notiId;
                sunObj2.setDate(sunObj2.getDate() + distance);
                cordova.plugins.notification.local.schedule({
                  id: notiId,
                  title: 'Health Plus',
                  text: textNotiTitle,
                  at: sunObj2,
                  every: "week"
                });
            }
            if(medTime3==true){
                var notiId = genNotiId();
                sunId3 = notiId;
                sunObj3.setDate(sunObj3.getDate() + distance);
                cordova.plugins.notification.local.schedule({
                  id: notiId,
                  title: 'Health Plus',
                  text: textNotiTitle,
                  at: sunObj3,
                  every: "week"
                });
            }
            if(medTime4==true){
                var notiId = genNotiId();
                sunId4 = notiId;
                sunObj4.setDate(sunObj4.getDate() + distance);
                cordova.plugins.notification.local.schedule({
                  id: notiId,
                  title: 'Health Plus',
                  text: textNotiTitle,
                  at: sunObj4,
                  every: "week"
                });
            }
        }
        if(monday==true){
            var daytoset = arrdaytoset[montoset];
            var distance = (daytoset + 7 - currentDay) % 7;
            var monObj1 = dateObj1;
            var monObj2 = dateObj2;
            var monObj3 = dateObj3;
            var monObj4 = dateObj4;
            for(var i=0;i<arrdaytoset.length-1;i++){
                if(currentDay == arrdaytoset[i]){
                    if(monObj1<nowDateobj){monObj1 = dateAdd(monObj1,'day',7);}
                    if(monObj2<nowDateobj){monObj2 = dateAdd(monObj2,'day',7);}
                    if(monObj3<nowDateobj){monObj3 = dateAdd(monObj3,'day',7);}
                    if(monObj4<nowDateobj){monObj4 = dateAdd(monObj4,'day',7);}
                }
            }
            if(medTime1==true){
                var notiId = genNotiId();
                monId1 = notiId;
                monObj1.setDate(monObj1.getDate() + distance);
                cordova.plugins.notification.local.schedule({
                  id: notiId,
                  title: 'Health Plus',
                  text: textNotiTitle,
                  at: monObj1,
                  every: "week"
                });
            }
            if(medTime2==true){
                var notiId = genNotiId();
                monId2 = notiId;
                monObj2.setDate(monObj2.getDate() + distance);
                cordova.plugins.notification.local.schedule({
                  id: notiId,
                  title: 'Health Plus',
                  text: textNotiTitle,
                  at: monObj2,
                  every: "week"
                });
            }
            if(medTime3==true){
                var notiId = genNotiId();
                monId3 = notiId;
                monObj3.setDate(monObj3.getDate() + distance);
                cordova.plugins.notification.local.schedule({
                  id: notiId,
                  title: 'Health Plus',
                  text: textNotiTitle,
                  at: monObj3,
                  every: "week"
                });
            }
            if(medTime4==true){
                var notiId = genNotiId();
                monId4 = notiId;
                monObj4.setDate(monObj4.getDate() + distance);
                cordova.plugins.notification.local.schedule({
                  id: notiId,
                  title: 'Health Plus',
                  text: textNotiTitle,
                  at: monObj4,
                  every: "week"
                });
            }                  
        }
        if(tuesday==true){
            var daytoset = arrdaytoset[tuestoset];
            var distance = (daytoset + 7 - currentDay) % 7;
            var tuesObj1 = dateObj1;
            var tuesObj2 = dateObj2;
            var tuesObj3 = dateObj3;
            var tuesObj4 = dateObj4;
            for(var i=0;i<arrdaytoset.length-1;i++){
                if(currentDay == arrdaytoset[i]){
                    if(tuesObj1<nowDateobj){tuesObj1 = dateAdd(tuesObj1,'day',7);}
                    if(tuesObj2<nowDateobj){tuesObj2 = dateAdd(tuesObj2,'day',7);}
                    if(tuesObj3<nowDateobj){tuesObj3 = dateAdd(tuesObj3,'day',7);}
                    if(tuesObj4<nowDateobj){tuesObj4 = dateAdd(tuesObj4,'day',7);}
                }
            }
            if(medTime1==true){
                var notiId = genNotiId();
                tuesId1 = notiId;
                tuesObj1.setDate(tuesObj1.getDate() + distance);
                cordova.plugins.notification.local.schedule({
                  id: notiId,
                  title: 'Health Plus',
                  text: textNotiTitle,
                  at: tuesObj1,
                  every: "week"
                });
            }
            if(medTime2==true){
                var notiId = genNotiId();
                tuesId2 = notiId;
                tuesObj2.setDate(tuesObj2.getDate() + distance);
                cordova.plugins.notification.local.schedule({
                  id: notiId,
                  title: 'Health Plus',
                  text: textNotiTitle,
                  at: tuesObj2,
                  every: "week"
                });
            }
            if(medTime3==true){
                var notiId = genNotiId();
                tuesId3 = notiId;
                tuesObj3.setDate(tuesObj3.getDate() + distance);
                cordova.plugins.notification.local.schedule({
                  id: notiId,
                  title: 'Health Plus',
                  text: textNotiTitle,
                  at: tuesObj3,
                  every: "week"
                });
            }
            if(medTime4==true){
                var notiId = genNotiId();
                tuesId4 = notiId;
                tuesObj4.setDate(tuesObj4.getDate() + distance);
                cordova.plugins.notification.local.schedule({
                  id: notiId,
                  title: 'Health Plus',
                  text: textNotiTitle,
                  at: tuesObj4,
                  every: "week"
                });
            }                        
        }
        if(wednesday==true){
            var daytoset = arrdaytoset[wedtoset];
            var distance = (daytoset + 7 - currentDay) % 7;
            var wedObj1 = dateObj1;
            var wedObj2 = dateObj2;
            var wedObj3 = dateObj3;
            var wedObj4 = dateObj4;
            for(var i=0;i<arrdaytoset.length-1;i++){
                if(currentDay == arrdaytoset[i]){
                    if(wedObj1<nowDateobj){wedObj1 = dateAdd(wedObj1,'day',7);}
                    if(wedObj2<nowDateobj){wedObj2 = dateAdd(wedObj2,'day',7);}
                    if(wedObj3<nowDateobj){wedObj3 = dateAdd(wedObj3,'day',7);}
                    if(wedObj4<nowDateobj){wedObj4 = dateAdd(wedObj4,'day',7);}
                }
            }
            if(medTime1==true){
                var notiId = genNotiId();
                wedId1 = notiId;
                wedObj1.setDate(wedObj1.getDate() + distance);
                cordova.plugins.notification.local.schedule({
                  id: notiId,
                  title: 'Health Plus',
                  text: textNotiTitle,
                  at: wedObj1,
                  every: "week"
                });
            }
            if(medTime2==true){
                var notiId = genNotiId();
                wedId2 = notiId;
                wedObj2.setDate(wedObj2.getDate() + distance);
                cordova.plugins.notification.local.schedule({
                  id: notiId,
                  title: 'Health Plus',
                  text: textNotiTitle,
                  at: wedObj2,
                  every: "week"
                });
            }
            if(medTime3==true){
                var notiId = genNotiId();
                wedId3 = notiId;
                wedObj3.setDate(wedObj3.getDate() + distance);
                cordova.plugins.notification.local.schedule({
                  id: notiId,
                  title: 'Health Plus',
                  text: textNotiTitle,
                  at: wedObj3,
                  every: "week"
                });
            }
            if(medTime4==true){
                var notiId = genNotiId();
                wedId4 = notiId;
                wedObj4.setDate(wedObj4.getDate() + distance);
                cordova.plugins.notification.local.schedule({
                  id: notiId,
                  title: 'Health Plus',
                  text: textNotiTitle,
                  at: wedObj4,
                  every: "week"
                });
            }        
        }
        if(thursday==true){
            var daytoset = arrdaytoset[thutoset];
            var distance = (daytoset + 7 - currentDay) % 7;
            var thuObj1 = dateObj1;
            var thuObj2 = dateObj2;
            var thuObj3 = dateObj3;
            var thuObj4 = dateObj4;
            for(var i=0;i<arrdaytoset.length-1;i++){
                if(currentDay == arrdaytoset[i]){
                    if(thuObj1<nowDateobj){thuObj1 = dateAdd(thuObj1,'day',7);}
                    if(thuObj2<nowDateobj){thuObj2 = dateAdd(thuObj2,'day',7);}
                    if(thuObj3<nowDateobj){thuObj3 = dateAdd(thuObj3,'day',7);}
                    if(thuObj4<nowDateobj){thuObj4 = dateAdd(thuObj4,'day',7);}
                }
            }
            if(medTime1==true){
                var notiId = genNotiId();
                thuId1 = notiId;
                thuObj1.setDate(thuObj1.getDate() + distance);
                cordova.plugins.notification.local.schedule({
                  id: notiId,
                  title: 'Health Plus',
                  text: textNotiTitle,
                  at: thuObj1,
                  every: "week"
                });
            }
            if(medTime2==true){
                var notiId = genNotiId();
                thuId2 = notiId;
                thuObj2.setDate(thuObj2.getDate() + distance);
                cordova.plugins.notification.local.schedule({
                  id: notiId,
                  title: 'Health Plus',
                  text: textNotiTitle,
                  at: thuObj2,
                  every: "week"
                });
            }
            if(medTime3==true){
                var notiId = genNotiId();
                thuId3 = notiId;
                thuObj3.setDate(thuObj3.getDate() + distance);
                cordova.plugins.notification.local.schedule({
                  id: notiId,
                  title: 'Health Plus',
                  text: textNotiTitle,
                  at: thuObj3,
                  every: "week"
                });
            }
            if(medTime4==true){
                var notiId = genNotiId();
                thuId4 = notiId;
                thuObj4.setDate(thuObj4.getDate() + distance);
                cordova.plugins.notification.local.schedule({
                  id: notiId,
                  title: 'Health Plus',
                  text: textNotiTitle,
                  at: thuObj4,
                  every: "week"
                });
            }
        }
        if(friday==true){
            var daytoset = arrdaytoset[fritoset];
            var distance = (daytoset + 7 - currentDay) % 7;
            var friObj1 = dateObj1;
            var friObj2 = dateObj2;
            var friObj3 = dateObj3;
            var friObj4 = dateObj4;
            for(var i=0;i<arrdaytoset.length-1;i++){
                if(currentDay == arrdaytoset[i]){
                    if(friObj1<nowDateobj){friObj1 = dateAdd(friObj1,'day',7);}
                    if(friObj2<nowDateobj){friObj2 = dateAdd(friObj2,'day',7);}
                    if(friObj3<nowDateobj){friObj3 = dateAdd(friObj3,'day',7);}
                    if(friObj4<nowDateobj){friObj4 = dateAdd(friObj4,'day',7);}
                }
            }
            if(medTime1==true){
                var notiId = genNotiId();
                friId1 = notiId;
                friObj1.setDate(friObj1.getDate() + distance);
                cordova.plugins.notification.local.schedule({
                  id: notiId,
                  title: 'Health Plus',
                  text: textNotiTitle,
                  at: friObj1,
                  every: "week"
                });
            }
            if(medTime2==true){
                var notiId = genNotiId();
                friId2 = notiId;
                friObj2.setDate(friObj2.getDate() + distance);
                cordova.plugins.notification.local.schedule({
                  id: notiId,
                  title: 'Health Plus',
                  text: textNotiTitle,
                  at: friObj2,
                  every: "week"
                });
            }
            if(medTime3==true){
                var notiId = genNotiId();
                friId3 = notiId;
                friObj3.setDate(friObj3.getDate() + distance);
                cordova.plugins.notification.local.schedule({
                  id: notiId,
                  title: 'Health Plus',
                  text: textNotiTitle,
                  at: friObj3,
                  every: "week"
                });
            }
            if(medTime4==true){
                var notiId = genNotiId();
                friId4 = notiId;
                friObj4.setDate(friObj4.getDate() + distance);
                cordova.plugins.notification.local.schedule({
                  id: notiId,
                  title: 'Health Plus',
                  text: textNotiTitle,
                  at: friObj4,
                  every: "week"
                });
            }
        }
        if(saturday==true){
            var daytoset = arrdaytoset[sattoset];
            var distance = (daytoset + 7 - currentDay) % 7;
            var satObj1 = dateObj1;
            var satObj2 = dateObj2;
            var satObj3 = dateObj3;
            var satObj4 = dateObj4;
            for(var i=0;i<arrdaytoset.length-1;i++){
                if(currentDay == arrdaytoset[i]){
                    if(satObj1<nowDateobj){satObj1 = dateAdd(satObj1,'day',7);}
                    if(satObj2<nowDateobj){satObj2 = dateAdd(satObj2,'day',7);}
                    if(satObj3<nowDateobj){satObj3 = dateAdd(satObj3,'day',7);}
                    if(satObj4<nowDateobj){satObj4 = dateAdd(satObj4,'day',7);}
                }
            }
            if(medTime1==true){
                var notiId = genNotiId();
                satId1 = notiId;
                satObj1.setDate(satObj1.getDate() + distance);
                cordova.plugins.notification.local.schedule({
                  id: notiId,
                  title: 'Health Plus',
                  text: textNotiTitle,
                  at: satObj1,
                  every: "week"
                });
            }
            if(medTime2==true){
                var notiId = genNotiId();
                satId2 = notiId;
                satObj2.setDate(satObj2.getDate() + distance);
                cordova.plugins.notification.local.schedule({
                  id: notiId,
                  title: 'Health Plus',
                  text: textNotiTitle,
                  at: satObj2,
                  every: "week"
                });
            }
            if(medTime3==true){
                var notiId = genNotiId();
                satId3 = notiId;
                satObj3.setDate(satObj3.getDate() + distance);
                cordova.plugins.notification.local.schedule({
                  id: notiId,
                  title: 'Health Plus',
                  text: textNotiTitle,
                  at: satObj3,
                  every: "week"
                });
            }
            if(medTime4==true){
                var notiId = genNotiId();
                satId4 = notiId;
                satObj4.setDate(satObj4.getDate() + distance);
                cordova.plugins.notification.local.schedule({
                  id: notiId,
                  title: 'Health Plus',
                  text: textNotiTitle,
                  at: satObj4,
                  every: "week"
                });
            }        
        }
        // Generate medId
        var medId;
        var medCount = localStorage.getItem("medcount");
        if (typeof medCount !== 'undefined' && medCount !== null){
            medCount = parseInt(medCount);
            medId = medCount+1;
        }else{
            medId = 1;
        }
        localStorage.setItem("medcount",medId);
        var medListLocal = localStorage.getItem("mednoti");
        // var jsontime1 = dateObj1.getHours()+':'+dateObj1.getMinutes();
        // var jsontime2 = dateObj2.getHours()+':'+dateObj2.getMinutes();
        // var jsontime3 = dateObj3.getHours()+':'+dateObj3.getMinutes();
        // var jsontime4 = dateObj4.getHours()+':'+dateObj4.getMinutes();
        var jsontime1 = d1.getHours()+':'+d1.getMinutes();
        var jsontime2 = d2.getHours()+':'+d2.getMinutes();
        var jsontime3 = d3.getHours()+':'+d3.getMinutes();
        var jsontime4 = d4.getHours()+':'+d4.getMinutes();
        if (medListLocal != 'undefined' && medListLocal != null){ // if medList in LocalStorage not null
            var medList = JSON.parse(localStorage.getItem("mednoti"));
            medList[medList.length] = {medId:medId, medTitle:medTitle, medAmount:medAmount, 
                 medEat:medEat, medDay:
                                        [
                                            {sunday:sunday,
                                            monday:monday,
                                            tuesday:tuesday,
                                            wednesday:wednesday,
                                            thursday:thursday,
                                            friday:friday,
                                            saturday:saturday}
                                        ],
                                medNotiId:
                                        [
                                            {notiId1:sunId1,notiId2:sunId2,notiId3:sunId3,notiId4:sunId4},
                                            {notiId1:monId1,notiId2:monId2,notiId3:monId3,notiId4:monId4},
                                            {notiId1:tuesId1,notiId2:tuesId2,notiId3:tuesId3,notiId4:tuesId4},
                                            {notiId1:wedId1,notiId2:wedId2,notiId3:wedId3,notiId4:wedId4},
                                            {notiId1:thuId1,notiId2:thuId2,notiId3:thuId3,notiId4:thuId4},
                                            {notiId1:friId1,notiId2:friId2,notiId3:friId3,notiId4:friId4},
                                            {notiId1:satId1,notiId2:satId2,notiId3:satId3,notiId4:satId4}
                                        ],
                                medTime:
                                        [
                                            {medBf:medTime1, 
                                            medLun:medTime2, 
                                            medDin:medTime3,
                                            medBed:medTime4}
                                        ],
                                medTimeValue:
                                        [
                                            {medTimeBf:jsontime1,
                                            medTimeLun:jsontime2,
                                            medTimeDin:jsontime3,
                                            medTimeBed:jsontime4}
                                        ],
                                 timestamp:timestamp};
            localStorage.setItem("mednoti",JSON.stringify(medList));
        }
        else{
            var medList = [];
            medList[0] = {medId:medId, medTitle:medTitle, medAmount:medAmount, 
                 medEat:medEat, medDay:
                                        [
                                            {sunday:sunday,
                                            monday:monday,
                                            tuesday:tuesday,
                                            wednesday:wednesday,
                                            thursday:thursday,
                                            friday:friday,
                                            saturday:saturday}
                                        ],
                                medNotiId:
                                        [
                                            {notiId1:sunId1,notiId2:sunId2,notiId3:sunId3,notiId4:sunId4},
                                            {notiId1:monId1,notiId2:monId2,notiId3:monId3,notiId4:monId4},
                                            {notiId1:tuesId1,notiId2:tuesId2,notiId3:tuesId3,notiId4:tuesId4},
                                            {notiId1:wedId1,notiId2:wedId2,notiId3:wedId3,notiId4:wedId4},
                                            {notiId1:thuId1,notiId2:thuId2,notiId3:thuId3,notiId4:thuId4},
                                            {notiId1:friId1,notiId2:friId2,notiId3:friId3,notiId4:friId4},
                                            {notiId1:satId1,notiId2:satId2,notiId3:satId3,notiId4:satId4}
                                        ],
                                medTime:
                                        [
                                            {medBf:medTime1, 
                                            medLun:medTime2, 
                                            medDin:medTime3,
                                            medBed:medTime4}
                                        ],
                                medTimeValue:
                                        [
                                            {medTimeBf:jsontime1,
                                            medTimeLun:jsontime2,
                                            medTimeDin:jsontime3,
                                            medTimeBed:jsontime4}
                                        ],timestamp:timestamp};
            localStorage.setItem("mednoti",JSON.stringify(medList));
        }
        window.location.href = "notification-medicine.html";
    }
}
function rdrDetailMedNotification(medValueId) {
    sessionStorage.setItem("meddetailid",medValueId);
    window.location.href = 'notification-medicine-detail.html';
}
function rdrDetailDocNoti(docValueId){
    sessionStorage.setItem("docdetailid",docValueId);
    window.location.href = 'notification-doctor-detail.html';
}
//Function for Notifications (Close)

function dateAdd(date, interval, units) {
  var ret = new Date(date); //don't change original date
  switch(interval.toLowerCase()) {
    case 'year'   :  ret.setFullYear(ret.getFullYear() + units);  break;
    case 'quarter':  ret.setMonth(ret.getMonth() + 3*units);  break;
    case 'month'  :  ret.setMonth(ret.getMonth() + units);  break;
    case 'week'   :  ret.setDate(ret.getDate() + 7*units);  break;
    case 'day'    :  ret.setDate(ret.getDate() + units);  break;
    case 'hour'   :  ret.setTime(ret.getTime() + units*3600000);  break;
    case 'minute' :  ret.setTime(ret.getTime() + units*60000);  break;
    case 'second' :  ret.setTime(ret.getTime() + units*1000);  break;
    default       :  ret = undefined;  break;
  }
  return ret;
}
function alertDismissed() {
    console.log('alertDismissed');
}