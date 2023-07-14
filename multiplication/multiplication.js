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
function setLimit(id){
  if(id==="js-column-matrix1")
    document.getElementById("js-row-matrix2").value=document.getElementById("js-column-matrix1").value;
  else if(id==="js-row-matrix2")
    document.getElementById("js-column-matrix1").value=document.getElementById("js-row-matrix2").value;
}
function check(i,j,row,column,key,n){
  if(key==="Enter"){
    if(i===row-1&&j===column-1){
      if(checkInput(n)){
        if(Number(n)===1)
          document.getElementById(`0,0,2`).focus();
        else
          solve();}}
    else
      movement(i,j,row,column,"ArrowRight",n);}
  else if(key==="ArrowUp"||key==="ArrowDown"||key==="ArrowLeft"||key==="ArrowRight")
    movement(i,j,row,column,key,n)
  else if(key==="Backspace"&&document.getElementById(`${i},${j},${n}`).value===""){
    movement(i,j,row,column,"ArrowLeft",n);
    event.preventDefault();}
  else if(key!=="0"&&key!=="1"&&key!=="2"&&key!=="3"&&key!=="4"&&key!=="5"&&key!=="6"&&key!=="7"&&key!=="8"&&key!=="9"&&key!=="/"&&key!=="-"&&key!=="Backspace")
    event.preventDefault();
}
function movement(i,j,row,column,key,n){
  i=Number(i);
  j=Number(j);
  row=Number(row);
  column=Number(column);
  n=Number(n);
  if(key==="ArrowUp"){
    if(n===2&&i===0&&j===0)
      document.getElementById(`${document.getElementById("js-row-matrix1").value-1},${document.getElementById("js-column-matrix1").value-1},1`).focus();
    if(i!==0)
      document.getElementById(`${i-1},${j},${n}`).focus();}
  if(key==="ArrowDown"){
    if(n===1&&i===row-1&&j===column-1)
      document.getElementById(`0,0,2`).focus();
    if(i!==row-1)
      document.getElementById(`${i+1},${j},${n}`).focus();}
  if(key==="ArrowLeft"){
    if(document.getElementById(`${i},${j},${n}`).selectionStart===0){
    if(n===2&&i===0&&j===0)
      document.getElementById(`${document.getElementById("js-row-matrix1").value-1},${document.getElementById("js-column-matrix1").value-1},1`).focus();
    if(j!==0)
      document.getElementById(`${i},${j-1},${n}`).focus();
    else if(i!==0)
      document.getElementById(`${i-1},${column-1},${n}`).focus();
      event.preventDefault();}}
  if(key==="ArrowRight"){
    if(document.getElementById(`${i},${j},${n}`).selectionStart===document.getElementById(`${i},${j},${n}`).value.length){
    if(n===1&&i===row-1&&j===column-1)
      document.getElementById(`0,0,2`).focus();
    if(j!==column-1)
      document.getElementById(`${i},${j+1},${n}`).focus();
    else if(i!==row-1)
      document.getElementById(`${i+1},0,${n}`).focus();
      event.preventDefault();}}   
  }
function setMatrix1(){
  const row= Number(document.getElementById("js-row-matrix1").value);
  const column= Number(document.getElementById("js-column-matrix1").value);
  if(row!==0&&column!==0){
  document.getElementById("js.input1").innerHTML="<br>";
    for(let i=0;i<row;i++){
      for(let j=0;j<column;j++){
        let id=[i,j];
          document.getElementById("js.input1").innerHTML+=`<input class="matrix1-input" onkeydown="check(${i},${j},${row},${column},event.key,1)" id="${id},1" title="[${id[0]+1},${id[1]+1}]" >\n`}
          document.getElementById("js.input1").innerHTML+=`<br>`
       }
        document.getElementById("js.input1").innerHTML+=`<button class="js-reset" onclick="reset1()">Reset</button><br>`;
      }
    }
function setMatrix2(){
    const row= Number(document.getElementById("js-row-matrix2").value);
    const column= Number(document.getElementById("js-column-matrix2").value);
    if(row!==0&&column!==0){
    document.getElementById("js.input2").innerHTML="<br>";
      for(let i=0;i<row;i++){
        for(let j=0;j<column;j++){
          let id=[i,j];
          document.getElementById("js.input2").innerHTML+=`<input class="matrixInput" onkeydown="check(${i},${j},${row},${column},event.key,2)" id="${id},2" title="[${id[0]+1},${id[1]+1}]" >\n`}
          document.getElementById("js.input2").innerHTML+=`<br>`
        }
         document.getElementById("js.input2").innerHTML+=`<button class="js-reset" onclick="reset2()">Reset</button><br><br><button class="js-solve" onclick="if(checkInput(1) && checkInput(2)) solve();">Solve</button><button class="js-reset" onclick="reset3()">Reset</button>`;
      }
    }
function checkInput(n){
  const row= Number(document.getElementById("js-row-matrix"+n).value);
  const column= Number(document.getElementById("js-column-matrix"+n).value);
    let flag=true
    let errors="Please enter a valid input at: ";
    for(let i=0;i<row;i++)
      for(let j=0;j<column;j++){
        let stringForm=document.getElementById(`${i},${j},${n}`).value;
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
function reset1(){
  const row= Number(document.getElementById("js-row-matrix1").value);
  const column= Number(document.getElementById("js-column-matrix1").value);
  for(let i=0;i<row;i++)
    for(let j=0;j<column;j++)
      document.getElementById(`${i},${j},1`).value="";
}
function reset2(){
  const row= Number(document.getElementById("js-row-matrix2").value);
  const column= Number(document.getElementById("js-column-matrix2").value);
  for(let i=0;i<row;i++)
    for(let j=0;j<column;j++)
      document.getElementById(`${i},${j},2`).value="";
}
function reset3(){
  reset1();reset2();
  document.querySelector(".js-solution").innerHTML=""

}
function solve(){
  document.querySelector(".js-solution").innerHTML="";
  let matrix1=[];
  let matrix2=[];
  load();
  function load(){
    const row1= Number(document.getElementById("js-row-matrix1").value);
    const column1= Number(document.getElementById("js-column-matrix1").value);
    for(let i=0;i<row1;i++){
      let miniMatrix=[]
      for(let j=0;j<column1;j++){
        let stringForm=document.getElementById(`${i},${j},1`).value;
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
    matrix1.push(miniMatrix);
  }
   const row2= Number(document.getElementById("js-row-matrix2").value);
   const column2= Number(document.getElementById("js-column-matrix2").value);
   for(let i=0;i<row2;i++){
    let miniMatrix=[]
    for(let j=0;j<column2;j++){
      let stringForm=document.getElementById(`${i},${j},2`).value;
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
      matrix2.push(miniMatrix);
    }
  }
  let product=multiply();
  function multiply(){
    const row= Number(document.getElementById("js-row-matrix1").value);
    const column= Number(document.getElementById("js-column-matrix2").value);
    const limit= Number(document.getElementById("js-column-matrix1").value);
    let product=[];
    for(let i=0;i<row;i++){
      let miniProduct=[];
      for(let j=0;j<column;j++)
        miniProduct.push(new Fraction());
      product.push(miniProduct);}
      for(let k=0;k<row;k++)
        for(let i=0;i<column;i++)
          for (let j=0;j<limit;j++)
            product[k][i]=product[k][i].add(matrix1[k][j].multiply(matrix2[j][i]));
        return product;
      }
      const productRow= Number(document.getElementById("js-row-matrix1").value);
      const productColumn= Number(document.getElementById("js-column-matrix2").value);
      let tableString="<br><a>Your product is:</a><br><br><table>\n";
      for(let i=0;i<productRow;i++){
        tableString+="<tr>\n";
       for(let j=0;j<productColumn;j++)
         tableString+=`<td height="30" width="65">${product[i][j]}</td>\n`;
         tableString+="</tr>\n";
        }   
        tableString+="</table>";
        document.querySelector(".js-solution").innerHTML=tableString;
      }