// JS PONG Game for single player by ChatGPT and Me

// ゲームの初期化
var canvas = document.getElementById("canvas");  // canvas要素を取得
var ctx = canvas.getContext("2d");  // canvasの2Dコンテキストを取得

var ball = { x: canvas.width/2, y: canvas.height/2, dx: 5, dy: 5, radius: 10 };  // ボールの初期位置と速度、半径
var paddle = { x: canvas.width/2, y: canvas.height-20, width: 80, height: 10 };  // パドルの初期位置とサイズ
var leftPressed = false;  // 左キーが押されているかどうかのフラグ
var rightPressed = false;  // 右キーが押されているかどうかのフラグ

// キーイベントのリスナーを追加
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// キーが押された時の処理
function keyDownHandler(e) {
    if(e.keyCode == 37) {  // 左キー
        leftPressed = true;
    }
    else if(e.keyCode == 39) {  // 右キー
        rightPressed = true;
    }
}

// キーが離された時の処理
function keyUpHandler(e) {
    if(e.keyCode == 37) {  // 左キー
        leftPressed = false;
    }
    else if(e.keyCode == 39) {  // 右キー
        rightPressed = false;
    }
}

// ボールを描画する関数
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);  // 円を描画
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// パドルを描画する関数
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x - paddle.width/2, paddle.y, paddle.width, paddle.height);  // 長方形を描画
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// ゲームループの関数
function draw() {
    // ボールの移動
    ball.x += ball.dx;
    ball.y += ball.dy;

    // 壁に当たった場合は反射
    if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
    }
    if(ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }
    else if(ball.y + ball.radius > canvas.height) {  // 下側の壁に当たった場合はゲームオーバー
        alert("GAME OVER");
        document.location.reload();  // ページをリロードしてリセット
    }

    // パドルとの衝突判定
    if(ball.y + ball.dy >


    // パドルとの衝突判定
    if(ball.y + ball.dy > canvas.height - ball.radius - paddle.height && ball.x > paddle.x - paddle.width/2 && ball.x < paddle.x + paddle.width/2) {
        ball.dy = -ball.dy;
    }

    // パドルの移動
    if(leftPressed && paddle.x > paddle.width/2) {
        paddle.x -= 7;
    }
    else if(rightPressed && paddle.x < canvas.width - paddle.width/2) {
        paddle.x += 7;
    }

    // 画面のクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ボールとパドルを描画
    drawBall();
    drawPaddle();

    // 次のフレームを描画
    requestAnimationFrame(draw);
}

// ゲームを開始する
draw();

