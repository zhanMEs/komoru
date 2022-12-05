import { Card } from 'react-bootstrap'

export default function CanUseCoupon(props) {

  return (
    <div className="p-3">
      <Card
        text="white"
        style={{ width: '100%', background:'#ED8C4E' }}
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