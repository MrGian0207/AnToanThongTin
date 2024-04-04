class VigenereCipher2 {
  getNumericValue(character: string): number {
    return character.toUpperCase().charCodeAt(0) - "A".charCodeAt(0);
  }

  generateMatrix() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let num = 0;
    let table = [];
    for (let i = 0; i < chars.length; i++) {
        let temp = []
        for (let j = 0; j < chars.length; j++) {
            temp.push(chars[(j + num) % 26])
        }
        table.push(temp);
        num++;
    }
    return table;
}

  encryptCharacter(textChar: string, keyChar: string, matrix : Array<[]>, updateUICallback: (x: Number, y: Number, coloredList: Array<number>) => void, coloredList: Array<number>): string {
    const x = this.getNumericValue(textChar);
    const y = this.getNumericValue(keyChar);
    updateUI(x, y, coloredList);
    return matrix[x][y];
  }

  decryptCharacter(textChar: string, keyChar: string, matrix: Array<[]>): string {
    const x = this.getNumericValue(textChar);
    let y = x - this.getNumericValue(keyChar);
    if (y < 0)
    {
      y = 26 + y;
    }
    return matrix[0][y];
  }



  removeAllSpaces(text: string): string {
    let result = "";
    for (const c of text) {
      if (c !== " ") {
        result += c;
      }
    }
    return result;
  }

  getKeySequence2(text: string, key: string)
  {
    let keySequence = "";
    text = this.removeAllSpaces(text);
    key = this.removeAllSpaces(key);
    if (text.length < key.length)
    {
      keySequence = key.substring(0, text.length);
    }
    else if (text.length >= key.length)
    {
      keySequence += key;
    }
    if (keySequence.length < text.length)
    {
      keySequence += text.substring(0, text.length - keySequence.length);
    }
    return keySequence;
  }

  encrypt2(text: string, key: string, updateUICallback: (x: Number, y: Number, coloredList: Array<number>) => void): string {
    let encryptedText = "";
    const keySequence = this.getKeySequence2(text, key);
    const matrix = this.generateMatrix();
    let coloredList = [];
    let spaces = 0;
    for (let i = 0; i < text.length; i++) {
      if (text[i] === " ") {
        encryptedText += " ";
        spaces++;
      } else {
        encryptedText += this.encryptCharacter(
          text[i],
          keySequence[i - spaces],
          matrix,
          updateUICallback, 
          coloredList
        );
      }
    }

    //Code de cap nhat giao dien, khong lien quan thuat toan
    
    return encryptedText;
  }

  // public static string Encrypt2(string text, string key)
  // {
  //     string encryptedText = "";
  //     string keySequence = GetKeySequence2(text, key);

  //     int spaces = 0;
  //     for (int i = 0; i < text.Length; i++)
  //     {
  //         if (text[i] == ' ')
  //         {
  //             encryptedText += ' ';
  //             spaces++;
  //         }
  //         else
  //         {
  //             encryptedText += EncryptCharacter(text[i], keySequence[i - spaces]);
  //         }
  //     }
  //     return encryptedText;
  // }

  decrypt2(text: string, key: string): string {
    let decryptedText = "";
    const keySequence = this.getKeySequence2(text, key);
    const matrix = this.generateMatrix();
    let spaces = 0;
    for (let i = 0; i < text.length; i++) {
      if (text[i] === " ") {
        decryptedText += " ";
        spaces++;
      } else {
        decryptedText += this.decryptCharacter(
          text[i],
          keySequence[i - spaces], 
          matrix
        );
      }
    }
    return decryptedText;
  }

  
}



const vigenereCipher2 = new VigenereCipher2();


const result = document.querySelector(".result");
const btn_encrypt = document.querySelector(".encrypt");
const btn_decrypt = document.querySelector(".decrypt");
const content_title = document.querySelector(".content-title");
const inputEncrypt = document.querySelector(".inputEncrypt");
const inputDecrypt = document.querySelector(".inputDecrypt");
let grid = document.querySelector(".grid");
const inputkeyEncrypt = document.querySelector(".inputKeyEncrypt");
const inputsAutoKey = document.getElementsByClassName("autoKey");
const array_result: Array<string> = [];
var plainText: string;
var cipherText: string;
var keyEncrypt: string;
var keyDecrypt: string;
let usedColors = [];
document.addEventListener('DOMContentLoaded', () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const matrix = vigenereCipher2.generateMatrix();
      grid.innerHTML = `<div class="grid-item"></div>`
      for (let k = 0; k < chars.length; k++)
      {
        grid.innerHTML += `<div class="grid-item">${chars[k]}</div>`;
      }
      for (let i = 0; i < matrix.length; i++)
      {
        for (let j = 0; j < matrix[i].length; j++)
        {
            if (j === 0)
            {
              grid.innerHTML += `<div class="grid-item">${matrix[i][j]}</div>`;
            }
            grid.innerHTML += `<div class="grid-item">${matrix[i][j]}</div>`;
        }
      }
})

function updateUI(x: number, y: number, coloredList: Array<number>)
{
  const colors = [
    "#00FF00", // Green
    "#0000FF", // Blue
    "#00FFFF", // Cyan
    "#FF00FF", // Magenta
    "#FFA500", // Orange
    "#800080", // Purple
    "#008080", // Teal
    "#FFC0CB", // Pink
    "#40E0D0", // Turquoise
    "#00FFFF", // Aqua
    "#FF7F50", // Coral
    "#FFD700", // Gold
    "#4B0082", // Indigo
    "#6200FF", // Electric Indigo
    "#800000", // Maroon
    "#000080", // Navy
    "#808000", // Olive
    "#DDA0DD", // Plum
    "#008000", // Olive Green
    "#800000"  // Maroon
  ];
  const childPosition = 27 * (y + 1) + x + 1;
  let children = grid.children;
  let color;
  do {
    color = Math.floor(Math.random() * (colors.length - 1));
  }
  while (usedColors.includes(color));
  usedColors.push(color);
  (children[childPosition] as HTMLElement).style.backgroundColor = colors[color];
  (children[childPosition] as HTMLElement).style.color = 'red';
  (children[childPosition] as HTMLElement).style.fontWeight = 'bold';
  coloredList.push(childPosition);
  for (let i = childPosition; i >= 0; i -= 27)
  {
    if (!coloredList.includes(i))
    {
      (children[i] as HTMLElement).style.backgroundColor = colors[color];
      (children[i] as HTMLElement).style.color = 'white';
      coloredList.push(i);
    }
    
  }
  for (let j = 1; j <= x + 1; j++)
  {
    // (children[childPosition - j] as HTMLElement).style.backgroundColor = colors[color];
    //   (children[childPosition - j] as HTMLElement).style.color = 'white';
    if (!coloredList.includes(childPosition - j))
    {
      (children[childPosition - j] as HTMLElement).style.backgroundColor = colors[color];
      (children[childPosition - j] as HTMLElement).style.color = 'white';
      coloredList.push(childPosition - j);
    }   
  }
}



inputEncrypt.addEventListener("change", (e) => {
  plainText = (e.target as HTMLInputElement)?.value.trim();
})

inputDecrypt.addEventListener("change", (e) => {
  cipherText = (e.target as HTMLInputElement)?.value;
})


inputkeyEncrypt.addEventListener("change", (e) => {
  keyEncrypt = (e.target as HTMLInputElement)?.value;
})

btn_encrypt.addEventListener("click", () => { 
      (content_title as HTMLElement).style.display = "block";
      for (let i = 0; i < inputsAutoKey.length; i++)
      {
        (inputsAutoKey[i] as HTMLInputElement).value = vigenereCipher2.getKeySequence2(plainText, keyEncrypt);
      }
      const cipher = vigenereCipher2.encrypt2(plainText, keyEncrypt, updateUI); 
      const card_result = 
      `<div class="card-result">
          <div class="card-result-header">Mã Hóa " ${plainText} "</div>
          <div class="card-result-body">
                <h5>Thông tin mã hóa</h5>
                <p>Key: "${keyEncrypt}"</p>
                <p>Bản mã: "${cipher}"</p>
                <p>Bản rõ: ${plainText}</p>
          </div>
       </div>`
      array_result.push(card_result);
      result.innerHTML = array_result.map((value: string) => {
        return value;
      }).join('');
      console.log(usedColors);
})

btn_decrypt.addEventListener("click", () => { 
    (content_title as HTMLElement).style.display = "block";
    keyDecrypt = (inputsAutoKey[0] as HTMLInputElement).value;
    const decryptText = vigenereCipher2.decrypt2(cipherText, keyDecrypt); 
    const card_result = 
    `<div class="card-result">
        <div class="card-result-header">Giải Mã " ${cipherText} "</div>
        <div class="card-result-body">
              <h5>Thông tin Giải mã</h5>
              <p>Bản rõ: ${decryptText}</p>
        </div>
     </div>`
    
    array_result.push(card_result);

    result.innerHTML = array_result.map((value: string) => {
      return value;
    }).join('');
})