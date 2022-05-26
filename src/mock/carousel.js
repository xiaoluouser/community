import Mock from "mockjs";

const Random = Mock.Random;

let carouselImage = [];

function carousel() {
    for (let i = 0; i < 5; i++) {
        let a = Random.image("680x320", randomColor(), "#fff", `Carousel${i}`);
        carouselImage.push(a);
    }
    if (carouselImage.length > 5) {
        carouselImage.length = 5;
    }
    return carouselImage;
}

function randomColor() {
    let color = '#';
    let colorNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
    for (let i = 0; i < 6; i++) {
        let randomNumber = Math.floor(Math.random() * colorNumber.length);
        color += colorNumber[randomNumber];
    }
    return color;
}

Mock.mock('/mock/carousel', carousel);