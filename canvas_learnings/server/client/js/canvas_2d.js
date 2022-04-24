(function(){

    let canvasFunc = (function() {
        let canvas;

        function quadraticBezier() {
          // quadratic bezier curves
          canvas = document.getElementById("quadratic_cubic_bezier");
          if (canvas.getContext) {
            let ctx = canvas.getContext("2d");
            ctx.beginPath();
            ctx.moveTo(75, 25);
            ctx.quadraticCurveTo(25, 25, 25, 62.5);
            ctx.quadraticCurveTo(25, 100, 50, 100);
            ctx.quadraticCurveTo(50, 120, 30, 125);
            ctx.quadraticCurveTo(60, 120, 65, 100);
            ctx.quadraticCurveTo(145, 110, 145, 62.5);
            ctx.quadraticCurveTo(145, 25, 75, 25);
            ctx.stroke();
            ctx.closePath();


            ctx.beginPath();
            ctx.moveTo(200, 100);
            ctx.bezierCurveTo(150, 50, 100, 40, 125, 100);
            ctx.stroke();
          }
        }

        function bezier() {
          // quadratic bezier curves
          canvas = document.getElementById("quadratic_cubic_bezier");
          if (canvas.getContext) {
            let ctx = canvas.getContext("2d");
            ctx.beginPath();
            ctx.moveTo(75, 40);
            ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
            ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
            ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
            ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
            ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
            ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
            ctx.fillStyle = 'red';
            ctx.fill();
          }
        }

        return {
          bezier,
          quadraticBezier
        };
    })();

    canvasFunc.bezier();

})();