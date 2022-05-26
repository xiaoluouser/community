 //函数防抖
 function debounce(fun, wait, immediate) {
     let timeout;
     return function () {
         let context = this;
         clearTimeout(timeout);
         if (immediate) {
             //在首次执行时，timeout为undefined
             if (!timeout) {
                 fun.apply(context, arguments);
                 timeout = 1;
             } else {
                 timeout = setTimeout(() => {
                     fun.apply(context, arguments);
                 }, wait);
             }
         } else {
             timeout = setTimeout(() => {
                 fun.apply(context, arguments);
             }, wait);
         }
     }
 }
 //函数节流
 function throttle(fun, wait, type) {
     let previous = 0;
     let timeout;
     return function () {
         let context = this;
         if (type === 1) {
             //通过新的时间戳和旧的时间来判断时间的间隔是否大于wait
             let now = Date.now();
             if (now - previous > wait) {
                 fun.apply(context, arguments);
                 previous = now;
             }
         } else if (type === 2) {
             //这里使用定时器的方法
             if (!timeout) {
                 timeout = setTimeout(() => {
                     fun.apply(context, arguments);
                     timeout = null;
                 }, wait);
             }
         }
     }
 }
 export {
     debounce,
     throttle
 };