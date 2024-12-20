<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz Forum Anak</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <style>
        body {
            font-family: 'Comic Sans MS', cursive, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #f0e5e5;
        }
        header {
            background: #ff80e1;
            color: white;
            padding: 10px 0;
            text-align: center;
            width: 100%;
        }
        main {
            padding: 20px;
            width: 100%;
            max-width: 800px;
        }
        .quiz-container {
            display: none;
        }
        .result-container {
            display: none;
        }
        button {
            margin-top: 20px;
            padding: 10px 15px;
            background: #ff80e1;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        button:hover {
            background: #ff69b4;
        }
        .options {
            margin-top: 10px;
        }
        .option {
            display: block;
            margin: 5px 0;
        }
        .input-field {
            margin-top: 10px;
            padding: 5px;
            width: 100%;
        }
    </style>
</head>
<body>
    <header>
        <h1>Quiz Forum Anak</h1>
    </header>
    <main>
        <div class="quiz-container" id="quizContainer">
            <h2>Quiz Tentang Forum Anak</h2>
            <p id="question"></p>
            <div id="options" class="options"></div>
            <input type="text" id="answerInput" class="input-field" placeholder="Jawaban Anda" style="display: none;">
            <button id="submitAnswerButton" onclick="submitAnswer()" style="display: none;">Kirim Jawaban</button>
        </div>
        <div class="result-container" id="resultContainer">
            <h2>Hasil Quiz</h2>
            <p id="score"></p>
            <button onclick="showHome()">Kembali ke Beranda</button>
        </div>
        <button id="startQuizButton" onclick="startQuiz()">Mulai Quiz</button>
    </main>

    <script>
        const questions = [
            { question: "Apa yang harus dilakukan anak-anak di Forum Anak?", type: "multiple", options: ["Berpartisipasi", "Menonton saja", "Tidak ada yang perlu dilakukan"], answer: "Berpartisipasi" },
            { question: "Forum Anak adalah tempat untuk berbagi pengalaman?", type: "truefalse", answer: true },
            { question: "Siapa yang boleh bergabung di Forum Anak?", type: "multiple", options: ["Hanya anak-anak", "Anak-anak dan orang dewasa", "Hanya orang dewasa"], answer: "Hanya anak-anak" },
            { question: "Partisipasi aktif anak-anak di Forum Anak dapat meningkatkan rasa percaya diri mereka?", type: "truefalse", answer: true },
            { question: "Keterlibatan anak dalam proses pengambilan keputusan yang berhubungan dengan hak anak & dilaksanakan atas?", type: "multiple", options:["kesadaran, pemahaman, dan kemauan bersama.", "kegabutan orang orang", "karna tanpa tujuan"], answer: "kesadaran, pemahaman, dan kemauan bersama." },
            { question: "isi pasal KHA pasal 12 ayat (1)", type: "multiple", options: ["setiap anak berhak untuk dapat hidup, tumbuh, berkembang dan berpartisipasi secara wajar sesuai dengan harkat dan martabat kemanusiaan serta mendapat perlindungan dari kekerasan dan diskriminasi.", "Menon", "Tidak ada yang perlu dilakukan"], answer: "setiap anak berhak untuk dapat hidup, tumbuh, berkembang dan berpartisipasi secara wajar sesuai dengan harkat dan martabat kemanusiaan serta mendapat perlindungan dari kekerasan dan diskriminasi." }
        ];

        let currentQuestionIndex = 0;
        let score = 0;

        function startQuiz() {
            document.getElementById('startQuizButton').style.display = 'none';
            document.getElementById('quizContainer').style.display = 'block';
            currentQuestionIndex = 0;
            score = 0;
            showQuestion();
        }

        function showQuestion() {
            const currentQuestion = questions[currentQuestionIndex];
            document.getElementById('question').innerText = currentQuestion.question;
            document.getElementById('options').innerHTML = '';
            document.getElementById('answerInput').style.display = 'none';
            document.getElementById('submitAnswerButton').style.display = 'none';

            if (currentQuestion.type === "multiple") {
                currentQuestion.options.forEach(option => {
                    const button = document.createElement('button');
                    button.innerText = option;
                    button.className = 'option';
                    button.onclick = () => answerQuestion(option);
                    document.getElementById('options').appendChild(button);
                });
            } else if (currentQuestion.type === "truefalse") {
                const trueButton = document.createElement('button');
                trueButton.innerText = "Benar";
                trueButton.onclick = () => answerQuestion(true);
                document.getElementById('options').appendChild(trueButton);

                const falseButton = document.createElement('button');
                falseButton.innerText = "Salah";
                falseButton.onclick = () => answerQuestion(false);
                document.getElementById('options').appendChild(falseButton);
            } else if (currentQuestion.type === "input") {
                document.getElementById('answerInput').style.display = 'block';
                document.getElementById('submitAnswerButton').style.display = 'block';
            }
        }

        function answerQuestion(selectedAnswer) {
            const currentQuestion = questions[currentQuestionIndex];
            if (currentQuestion.type === "multiple" || currentQuestion.type === "truefalse") {
                if (selectedAnswer === currentQuestion.answer || (currentQuestion.type === "truefalse" && selectedAnswer === (currentQuestion.answer === true))) {
                    score++;
                }
            }
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                showResult();
            }
        }

        function submitAnswer() {
            const currentQuestion = questions[currentQuestionIndex];
            const userAnswer = document.getElementById('answerInput').value;
            if (userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
                score++;
            }
            currentQuestionIndex++;
            document.getElementById('answerInput').value = '';
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                showResult();
            }
        }

        function showResult() {
            document.getElementById('quizContainer').style.display = 'none';
            document.getElementById('resultContainer').style.display = 'block';
            document.getElementById('score').innerText = `Anda mendapatkan ${score} dari ${questions.length} jawaban benar.`;
        }

        function showHome() {
            window.location.href = "PROJECT FORUM ANAK.html";
        }
    </script>
</body>
</html>

