export default function (files, imgType) {
    let canvas = document.createElement("canvas");
    let img = new Image();
    return new Promise((resolve) => {
        img.src = files;
        img.onload = function () {
            let compressWidth, compressHeight;
            if (img.width > 500) {
                compressWidth = 500;
                compressHeight = img.height * (500 / img.width);
            } else {
                compressWidth = img.width;
                compressHeight = img.height;
            }
            canvas.width = compressWidth;
            canvas.height = compressHeight;
            let ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            let imgData = canvas.toDataURL(imgType, 0.6); //这个质量只会在图片格式指定为jpeg时，才会起作用
            resolve(imgData);
        };
    });
}