 const container = document.getElementById('fire-container');
 const SPARK_COUNT = 10;    // 一次生成火花的数量
 const SPARK_TTL = 500;     // 每个火花持续时间 (ms)
 const LIGHTNING = true; //开关闪电

 function createSpark(x, y) {
    const spark = document.createElement('div');
    spark.classList.add('spark');
    spark.style.left = x + 'px';
    spark.style.top = y + 'px';
    container.appendChild(spark);

     // 随机速度和角度
    const angle = Math.random() * Math.PI * 2;
    const speed = 1 + Math.random() * 3;
    const dx = Math.cos(angle) * speed;
    const dy = Math.sin(angle) * speed;

    let opacity = 1;
    const intervalId = setInterval(() => {
        opacity -= 0.05;
        if (opacity < 0) {
             clearInterval(intervalId);
             spark.remove();
             return;
         }
         spark.style.left = (parseFloat(spark.style.left) + dx) + 'px';
         spark.style.top = (parseFloat(spark.style.top) + dy) + 'px';
         spark.style.opacity = opacity;

    }, 20);
    return spark;
 }
 function createLightning(x, y) {
        if (!LIGHTNING) return;
            const lightning = document.createElement('div')
            lightning.classList.add('lightning')
            lightning.style.top = y + 'px';
            lightning.style.left = x + 'px';
            container.appendChild(lightning);

            const endX = x + 20 * (Math.random() - .5);
            const endY = y + 50 * (Math.random() - .7);
            let length = Math.sqrt(Math.pow((endX-x),2) + Math.pow((endY-y),2));
            lightning.style.height = length + 'px';
            lightning.style.transformOrigin = 'top left';
            lightning.style.transform = `rotate(${ Math.atan2(endY-y, endX -x)  }rad)`;

             setTimeout(() => {
                 lightning.remove()
             }, 500);
 }

 document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    for(let i = 0; i < SPARK_COUNT; i++) {
        createSpark(x, y);
    }

    createLightning(x, y)
});
