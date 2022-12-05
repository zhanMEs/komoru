import {Card} from 'react-bootstrap'


export default function UsedCoupon(props){

  return(
    <div className="p-3 ">
        <Card
          text="secondary"
          style={{ width: '100%', background:'#d9d9d9'  }}
          className="mb-1 p-4"
        >
          <Card.Body>
            <Card.Title>
                優惠代碼 {props.couponTitle}
            </Card.Title>
            <Card.Text className='fs-3'>
                折扣 {props.discount} 元
            </Card.Text>
          </Card.Body>
        </Card>
    </div>
  )
}