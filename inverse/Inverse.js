class Fraction{
  constructor(numerator=0,denominator=1){
      if(denominator<0){
          this.numerator=-numerator;
          this.denominator=-denominator;}
      else{
          this.numerator=numerator;
          this.denominator=denominator;}
          this.simplify()
        }
  toString(){
    this.simplify();
    return (this.denominator===0)?"Undefined":(this.numerator===0 || this.denominator===1)?this.numerator+"":(this.numerator+"/"+this.denominator);}
  simplify(){
      let gcm=1;
      for(let i=2;i<=this.denominator;i++)
          if((this.numerator%i===0) && this.denominator%i===0)
            gcm=Math.max(gcm,i);
              this.numerator/=gcm;
              this.denominator/=gcm;
      if(this.numerator===0)
        this.denominator=1;
            }
  add(fraction){
    return (this.denominator===fraction.denominator)?new Fraction(this.numerator+fraction.numerator,this.denominator):new Fraction((this.numerator*fraction.denominator)+(fraction.numerator*this.denominator),this.denominator*fraction.denominator);
  }
  subtract(fraction){
    return this.add(new Fraction(-fraction.numerator,fraction.denominator));}
  multiply(fraction){
    return new Fraction(this.numerator*fraction.numerator,this.denominator*fraction.denominator);
  }
  divide(fraction){
    let quotient=new Fraction(this.numerator*fraction.denominator,this.denominator*fraction.numerator);
      if(quotient.denominator<0){
          quotient.numerator=-quotient.numerator;
          quotient.denominator=-quotient.denominator;}
      return quotient;
    }
  equals(fraction){return (fraction.numerator===0)?this.numerator===fraction.numerator:this.numerator===fraction.numerator&&this.denominator===fraction.denominator;
  }
}
function setMatrix(){
  const size= Number(document.querySelector(".js-size").value);
  document.querySelector(".js-inputs").innerHTML="";
  if(size>=2){
    for(let i=0;i<size;i++){
      for(let j=0;j<size;j++){
        let id=[i,j];
        document.querySelector(".js-inputs").innerHTML+=`<input class="matrixInput" onkeydown="check(event.key.charCodeAt(0));
        if(event.key==='Enter')
          changeFocus(${i},${j},${size});
        " id="${id}"
        title="[${id[0]+1},${id[1]+1}]" >\n`}
        document.querySelector(".js-inputs").innerHTML+=`<br>`
      }
      document.querySelector(".js-inputs").innerHTML+=`<button class="js-solve" onclick="if(checkInput()) solve();">Solve</button>
      <button class="js-reset" onclick="reset()">Reset</button>`;
    }
  }
function check(key){
  if(key>57||key<45||key===46)
    if(key!==66&&key!==69)
      event.preventDefault();
}
function reset(){
  const size= Number(document.querySelector(".js-size").value);
  for(let i=0;i<size;i++)
    for(let j=0;j<size;j++)
      document.getElementById(`${i},${j}`).value="";
      document.querySelector(".js-inputs").innerHTML="";
      if(size>=2){
        for(let i=0;i<size;i++){
          for(let j=0;j<size;j++){
            let id=[i,j];
            document.querySelector(".js-inputs").innerHTML+=`<input class="matrixInput" onkeydown="check(event.key.charCodeAt(0));
            if(event.key==='Enter')
              changeFocus(${i},${j},${size});
            " id="${id}"
            title="[${id[0]+1},${id[1]+1}]" >\n`}
            document.querySelector(".js-inputs").innerHTML+=`<br>`
          }
          document.querySelector(".js-inputs").innerHTML+=`<button class="js-solve" onclick="if(checkInput()) solve();">Solve</button>
          <button class="js-reset" onclick="reset()">Reset</button>`;
        }
        document.querySelector(".js-solution").innerHTML="";
      }
function changeFocus(i,j,size){
  if(i===size-1&&j===size-1){
    if(checkInput())
      solve();}
  else
    document.getElementById(`${j===size-1?i+1:i},${j===size-1?0:j+1}`).focus();
}
function checkInput(){
  const size= Number(document.querySelector(".js-size").value);
    let flag=true
    let errors="Please enter a valid input at: ";
    for(let i=0;i<size;i++)
      for(let j=0;j<size;j++){
        let stringForm=document.getElementById(`${i},${j}`).value;
        let dash=0;
        let end=0;
        let error=""
        if(stringForm.length===0){
          error=` [${i+1},${j+1}] `;
          flag=false;
          errors+=error;}
        else{
          for(let k=0;k<stringForm.length;k++,end=k)
            if(stringForm.charAt(k)=='/')
              dash=k;
            if(dash!=0){
            let temp=new Fraction(Number(stringForm.substring(0,dash)),Number(stringForm.substring(dash+1,end)));
            if(isNaN(temp.numerator)){
              error=` [${i+1},${j+1}] `;
              flag=false;
              errors+=error;
            }
          }
            else{
              let temp=new Fraction(Number(stringForm.substring(0,end)));
              if(isNaN(temp.numerator)){
                error=` [${i+1},${j+1}] `;
                flag=false;
                errors+=error;
              }
            } 
          }
        }
        if(!flag)
          alert(errors);
        return flag;
        }
function solve(){
  document.querySelector(".js-solution").innerHTML="";
  let matrix=load();
  function load(){
    const size= Number(document.querySelector(".js-size").value);
    let matrix=[];
    for(let i=0;i<size;i++){
      let miniMatrix=[]
      for(let j=0;j<size;j++){
        let stringForm=document.getElementById(`${i},${j}`).value;
        let dash=0;
        let end=0;
        for(let k=0;k<stringForm.length;k++,end=k)
        if(stringForm.charAt(k)=='/')
        dash=k;
        if(dash!=0)
        miniMatrix.push(new Fraction(Number(stringForm.substring(0,dash)),Number(stringForm.substring(dash+1,end))));
        else
        miniMatrix.push(new Fraction(Number(stringForm.substring(0,end))));
    }
    matrix.push(miniMatrix);
  }
  return matrix;
}
  let copyMatrix=[];   //coping matrix to check if invertible
  for(let i=0;i<matrix.length;i++){ 
    let miniMatrix=[]
    for(let j=0;j<matrix.length;j++)
      miniMatrix.push(matrix[i][j]);
    copyMatrix.push(miniMatrix);}
let determinantSign=new Fraction(arrange(copyMatrix));
function arrange(matrix){
  let size=matrix.length;
  let sign=1;
  for(let i=0;i<size;i++)
    if(matrix[i][i].equals(new Fraction()))
      for(let j=i+1;j<size;j++)
        if(!(matrix[j][i].equals(new Fraction()))){
          let temp=matrix[i];
          matrix[i]=matrix[j];
          matrix[j]=temp;
          sign=-1;
          break;
      }
  if(matrix[size-1][size-1].equals(new Fraction())){
    for(let i=0;i<size;i++)
      if(!(matrix[i][size-1].equals(new Fraction())) && !(matrix[size-1][i].equals(new Fraction()))){
        let temp=matrix[i];
            matrix[i]=matrix[size-1];
            matrix[size-1]=temp;
            sign=-1;
            break;
      }
    }
    return sign;
  }
  let d=determinant(determinantSign,copyMatrix);
  function determinant(determinantSign,matrix){
    for(let i=0;i<matrix.length;i++)
      for(let j=0;j<matrix.length;j++){
        if(i===j){
          for(let b=i+1;b<matrix.length;b++){
            let pivot=matrix[b][j].divide(matrix[i][j]);
              if(!(matrix[b][j].equals(new Fraction(0,1)))){
                for(let a=j;a<matrix[b].length;a++){
                  matrix[b][a]=matrix[b][a].subtract(matrix[i][a].multiply(pivot));}}}}}
       let determinant=new Fraction(1);
       for(let i=0;i<matrix.length;i++)
          determinant=determinant.multiply(matrix[i][i]);
       return determinant.multiply(determinantSign);
      }
      if(d.equals(new Fraction())){
        document.querySelector(".js-solution").innerHTML="This matrix is singluar.";}
      else{
   identity(matrix);
    function identity(matrix){
      for(let i=0;i<matrix.length;i++)
        for(let j=0;j<matrix.length;j++){
          if(i===j)
          matrix[i].push(new Fraction(1));
          else
          matrix[i].push(new Fraction());
        }
    }
    arrange(matrix);
    function arrange(matrix){
      for(let i=0;i<matrix.length;i++)
        if(matrix[i][i].equals(new Fraction()))
          for(let j=i+1;j<matrix.length;j++)
            if(!(matrix[j][i].equals(new Fraction()))){
              let temp=matrix[i];
              matrix[i]=matrix[j];
              matrix[j]=temp;
              break;
          }
      if(matrix[matrix.length-1][matrix.length-1].equals(new Fraction())){
        for(let i=0;i<matrix.length;i++)
          if(!(matrix[i][matrix.length-1].equals(new Fraction())) && !(matrix[matrix.length-1][i].equals(new Fraction()))){
            let temp=matrix[i];
                matrix[i]=matrix[matrix.length-1];
                matrix[matrix.length-1]=temp;
                break;
        }
      }
    }
    gauss(matrix);
function gauss(matrix){
  for(let i=0;i<matrix.length;i++)
    for(let j=0;j<matrix[i].length;j++) {
      if(i==j){
        if (!(matrix[i][j].equals(new Fraction(1))) && !(matrix[i][j].equals(new Fraction()))) {
          let pivot=matrix[i][j];//making the pivot=1
            for (let k=0;k<matrix[i].length; k++)
              matrix[i][k]=matrix[i][k].divide(pivot);
            }
            if (matrix[i][j].equals(new Fraction(1))){//starting to divide under the pivot
              for (let b=i+1;b<matrix.length; b++) {
                let pivot=matrix[b][j];
                  if (!(matrix[b][j].equals(new Fraction())))
                    for (let a=j;a<matrix[b].length;a++)
                      matrix[b][a] = matrix[b][a].subtract(matrix[i][a].multiply(pivot));
                    }
                  }
                }
              }
            }
jordan(matrix)
function jordan(matrix){
  for(let i=matrix.length-1;i>=0;i--)
    for (let j=matrix[i].length-1;j>=0;j--){
      if(i==j){
        if (!(matrix[i][j].equals(new Fraction(1))) && !(matrix[i][j].equals(new Fraction()))) {
          let pivot =matrix[i][j];
            for (let k=0;k<matrix[i].length;k++)
              matrix[i][k]=matrix[i][k].divide(pivot);
            }
            if(matrix[i][j].equals(new Fraction(1))) {
              for(let b=i-1;b>=0;b--){
                let pivot=matrix[b][j];
                  if (!(matrix[b][j].equals(new Fraction())))
                    for (let a=0;a<matrix[i].length; a++)
                      matrix[b][a]=matrix[b][a].subtract(matrix[i][a].multiply(pivot));
                    }
                  }
                }
              }
            }
let solution=[];
for(let i=0;i<matrix.length;i++){
  let miniSolution=[];
  for(let j=matrix.length;j<(matrix.length*2);j++)
    miniSolution.push(matrix[i][j]);
  solution.push(miniSolution);
}
let tableString="<br><a>Your inverse is:</a><br><br><table>\n";
for(let i=0;i<solution.length;i++){
  tableString+="<tr>\n";
  for(let j=0;j<solution.length;j++)
    tableString+=`<td height="30" width="65">${solution[i][j]}</td>\n`;
  tableString+="</tr>\n";
}
tableString+="</table>";
document.querySelector(".js-solution").innerHTML=tableString;
}}