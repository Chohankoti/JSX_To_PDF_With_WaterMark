import './App.css';
import { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Watermark } from 'antd';

function App() {

  const[loader, setloader] = useState(false);

  const dowloadPDF = () =>{
    const capture = document.querySelector('.invoice')
    setloader(true) 
    html2canvas(capture).then((canvas)=>{
      const imgData = canvas.toDataURL('./logo.svg') 
      const doc=new jsPDF('p','mm','a4');
      const componentwidth = doc.internal.pageSize.getWidth();
      const componentheight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, 'PNG',0,0, componentwidth,componentheight)     
      doc.save('sample.pdf')
      setloader(false)
    })
   
  }

  const senderInfo = {
    name: 'Your Company Name',
    address: '123 Main Street, City, State, Zip',
    email: 'youremail@example.com',
    phone: '123-456-7890',
  };

  const recipientInfo = {
    name: 'Client Name',
    address: '456 Client Street, City, State, Zip',
    email: 'clientemail@example.com',
    phone: '987-654-3210',
  };

  const invoiceItems = [
    { description: 'Item 1', price: 100 },
    { description: 'Item 2', price: 75 },
    { description: 'Item 3', price: 50 },
  ];

  const totalAmount = invoiceItems.reduce((total, item) => total + item.price, 0);

  return (
    <div >
    
    <div className="invoice">
    <Watermark content={recipientInfo.email}>
        <div className="invoice-header">
        <h1>invoice</h1>
        </div>
        <div className="sender-info">
          <h3>From:</h3>
          <p>{senderInfo.name}</p>
          <p>{senderInfo.address}</p>
          <p>Email: {senderInfo.email}</p>
          <p>Phone: {senderInfo.phone}</p>
        </div>
        <div className="recipient-info">
          <h3>To:</h3>
          <p>{recipientInfo.name}</p>
          <p>{recipientInfo.address}</p>
          <p>Email: {recipientInfo.email}</p>
          <p>Phone: {recipientInfo.phone}</p>
        </div>
        <div className="invoice-details">
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {invoiceItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.description}</td>
                  <td>${item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="total-amount">
          <p>Total: ${totalAmount}</p>
        </div>
        </Watermark>
      </div>

    
      
      <div style={{ display: "flex", justifyContent: "center", margin:"10px" }}>
        <button className='button' onClick={dowloadPDF} disabled={!(loader===false)}>
          {loader?(<span>Dowloading</span>):(<span>Dowload</span>)}
        </button>
      </div>

    </div>

  );
}

export default App;
