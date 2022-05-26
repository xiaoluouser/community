function messageSound() {
    let audioCtx = new AudioContext();
    let oscillator = audioCtx.createOscillator();
    let gainNode = audioCtx.createGain();
    gainNode.gain.value = 0.5; // 音量 0~1
    oscillator.type = "sine"; // 振荡器输出正弦波
    oscillator.frequency.value = 400; // 振荡频率200Hz
    oscillator.connect(gainNode); // 发生源振荡器连接音量
    gainNode.connect(audioCtx.destination); //音量连接扬声器
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.2);
}
export {
    messageSound
};