import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
 *{
   padding:0;
   margin:0;
   box-sizing: border-box;
 }
 
 html {
   font-size:16px;
 }

 ul,li,ol{
  padding:0;
  margin:0;
 }
 
 a{
   text-decoration:none;
   color:black;
 }
 
 input{
   border:none;
   outline:none;
 }
 
 textarea{
   border:none;
   resize:none;
   outline:none;
   line-height:20px;
 }
 
 button{
   border:none;
   cursor:pointer;
 }
`;

export default GlobalStyle;
