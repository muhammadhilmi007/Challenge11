/* 
    ****** Challenge #11 *******

    !! TEBAK KATA !!
      Buatlah sebuah permainan tebak kata, gunakan file data.json untuk menyimpan daftar pertanyaan dan jawaban. file data.json sudah disertakan di github.
*/

//!! Langkah dan Method untuk penyelesainnya
const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Tebakan: ",
});

let pertanyaans = [];
let cariIndex = 0;

rl.prompt();

function bacaPertanyaan() {
  try {
    const data = fs.readFileSync("data.json", "utf-8");

    const parseData = JSON.parse(data);

    pertanyaans = parseData.pertanyaans;
  } catch (error) {
    console.log("Coba Cek lagi Filenya!", error.message);
    process.exit(1);
  }
}

function tampilkanPertanyaan() {
  if (cariIndex >= pertanyaans.length) {
    akhirPermainan();
    return;
  }
  console.log("Pertanyaan:", pertanyaans[cariIndex].pertanyaan);
}

function cekJawaban(input) {
  const jawabanBenar = pertanyaans[cariIndex].tebakan;

  if (input === "keluar") {
    akhirPermainan();
    return;
  }

  if (input === jawabanBenar) {
    console.log(`Selamat! Anda Benar!`);
    pertanyaanSelanjutnya();
  } else {
    console.log(`Wwkwkwk, Anda Kurang beruntung!`);
    // tampilkanPertanyaan();
  }
  rl.prompt()
}

function pertanyaanSelanjutnya() {
  cariIndex++;
  if (cariIndex < pertanyaans.length) {
    tampilkanPertanyaan();
  } else {
    akhirPermainan();
  }
}

function akhirPermainan() {
  console.log(`Hore Anda Menang!`);
  rl.close();
}

function mulaiPermainan() {
  console.log(
    `Selamat datang di permainan Tebak Kata, Silahkan isi dengan Jawaban yang benar ya!`
  );

  bacaPertanyaan();

  tampilkanPertanyaan();
}

mulaiPermainan();
rl.prompt();

rl.on("line", (input) => {
  const bersihkanInputan = input.trim().toLowerCase();
  cekJawaban(bersihkanInputan);
});

rl.on("close", () => {
  console.log("Terima Kasih telah bermain");
  process.exit(0);
});
