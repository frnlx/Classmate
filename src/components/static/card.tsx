import { CSSProperties } from "react";

const style: CSSProperties = {
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 0 1px #2563eb'
}

type props = {
  children: React.ReactNode
}

function Card({ children }: props) {
  return (
    <div className='asdf' style={style}>
      {children}
    </div>
  );
}
 
export default Card