import '../../components/User/User.css'

export default function UserHeader(props) {

// let bgFix={
//   backgroundSize: "cover",
//   backgroundRepeat: "no-repeat",
//   backgroundAttachment: "fixed",
//   backgroundPosition: "bottom center",
//   background:`url(${props.backgroundIMG})`,

//   textAlign: "center",
//   color: "#fff",
//   textShadow: "0 4 4 rgba(0, 0, 0, 0.25)",
//   padding: "200"
// }

  return (
      // <div className='User--titleBar User--bg--fix' >
      <>
        <h2>{props.title}</h2>
        <p className='pt-3 fs-5'>{props.text}</p>
      </>
      // </div>
  )
}