var canvas = document.getElementById('keyboard');
var ctx = canvas.getContext('2d');

var keyboardImg = new Image();
var uploadedImage = new Image();

keyboardImg.src = "img/keyboard.png"
keyboardImg.onload = function(){
    var keyImgCenterOffsetX = (canvas.width - keyboardImg.width) / 2
    var keyImgCenterOffsetY = (canvas.height - keyboardImg.height) / 2
    ctx.drawImage(keyboardImg,keyImgCenterOffsetX,keyImgCenterOffsetY);
}

uploadedImage.onload = function(){
    var imgCenterOffsetX = (canvas.width - uploadedImage.width) / 2
    var imgCenterOffsetY = (canvas.height - uploadedImage.height) / 2
    ctx.drawImage(uploadedImage, imgCenterOffsetX, imgCenterOffsetY);
}


function loadImage(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (result) {
            var image = result.target.result
            var resize = calculateAspectRatioFit(image.width, image.height, keyboardImg.height, keyboardImg.width);
            uploadedImage.width = resize.width; 
            uploadedImage.height = resize.height;
            uploadedImage.src = image;
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return { width: srcWidth*ratio, height: srcHeight*ratio };
}

var target = document.getElementById("drop-target");
target.addEventListener("dragover", function(e){e.preventDefault();}, true);
target.addEventListener("drop", function(e){
        e.preventDefault(); 
            loadImage(e.dataTransfer);
}, true);
