export default function ItemName({ item }) {
  return (
    <div className="data">
      <div className="wrapper">
        <div className="notif">{item.quantity}</div>
        {/* you could make it bolder by targeting this p using CSS. The less JSX react needs to convert back to HTML the faster you app will be.*/}
        {/* based on the Optimiiign react app video course */}
        <p>
          <strong>{item.name}</strong>
        </p>
      </div>
    </div>
  );
}
