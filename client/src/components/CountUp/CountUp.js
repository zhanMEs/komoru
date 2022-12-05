import { useCountUp } from 'react-countup';

export default function SimpleHook () {
  useCountUp({ ref: 'counter', end:72314 ,enableScrollSpy: 1 });
  
  return <div id="counter" style={{
    fontSize:"140px",
    color:"#ed8c4e",
    display:"flex",
    /* 水平置中 */
    justifyContent: "center", 
    /* 垂直置中 */
    alignItems: "center",
   
}} />;

};


  

