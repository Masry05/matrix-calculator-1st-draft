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
        document.querySelector(".js-inputs").innerHTML+=`<input class="matrixInput" onkeydown="check(${i},${j},${size},event.key);" id="${id}"
        title="[${id[0]+1},${id[1]+1}]" >\n`}
        document.querySelector(".js-inputs").innerHTML+=`<br>`
      }
      document.querySelector(".js-inputs").innerHTML+=`<button class="js-solve" onclick="if(checkInput()) solve();">Solve</button>
      <button class="js-reset" onclick="reset()">Reset</button>`;
    }
    document.getElementById("0,0").focus();
  }
  function check(i,j,size,key){
    if(key==="Enter"){
      if(i===size-1&&j===size-1){
        if(checkInput())
          solve();}
      else
        movement(i,j,size,"ArrowRight")}
    else if(key==="ArrowUp"||key==="ArrowDown"||key==="ArrowLeft"||key==="ArrowRight")
      movement(i,j,size,key)
    else if(key==="Backspace"&&document.getElementById(`${i},${j}`).value===""){
      movement(i,j,size,"ArrowLeft");
      event.preventDefault();}
    else if(key!=="0"&&key!=="1"&&key!=="2"&&key!=="3"&&key!=="4"&&key!=="5"&&key!=="6"&&key!=="7"&&key!=="8"&&key!=="9"&&key!=="/"&&key!=="-"&&key!=="Backspace")
      event.preventDefault();
  }
  function movement(i,j,size,key){
    i=Number(i);
    j=Number(j);
    size=Number(size);
    if(key==="ArrowUp")
      if(i!==0)
        document.getElementById(`${i-1},${j}`).focus();
    if(key==="ArrowDown")
      if(i!==size-1)
      document.getElementById(`${i+1},${j}`).focus();
    if(key==="ArrowLeft"){
      if(document.getElementById(`${i},${j}`).selectionStart===0){
      if(j!==0)
        document.getElementById(`${i},${j-1}`).focus();
      else if(i!==0)
        document.getElementById(`${i-1},${size-1}`).focus();
        event.preventDefault();}}
    if(key==="ArrowRight"){
      if(document.getElementById(`${i},${j}`).selectionStart===document.getElementById(`${i},${j}`).value.length){
      if(j!==size-1)
      document.getElementById(`${i},${j+1}`).focus();
      else if(i!==size-1)
      document.getElementById(`${i+1},0`).focus();
      event.preventDefault();}}}
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
            document.querySelector(".js-inputs").innerHTML+=`<input class="matrixInput" onkeydown="check(${i},${j},${size},event.key);" id="${id}"
            title="[${id[0]+1},${id[1]+1}]" >\n`}
            document.querySelector(".js-inputs").innerHTML+=`<br>`
          }
          document.querySelector(".js-inputs").innerHTML+=`<button class="js-solve" onclick="if(checkInput()) solve();">Solve</button>
          <button class="js-reset" onclick="reset()">Reset</button>`;
        }
        document.querySelector(".js-solution").innerHTML="";
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
let determinantSign=new Fraction(arrange(matrix));
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
let d=determinant(determinantSign);
function determinant(determinantSign){
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
  document.querySelector(".js-solution").innerHTML+=`<br><a>Your determinant is: </a>`;
  document.querySelector(".js-solution").innerHTML+=`<a>${d}</a>`;
}