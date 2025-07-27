"use client";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { QRCodeSVG } from "qrcode.react";
import Navbar from '../components/Navbar';

const Donate = () => {
  return (
    <>
    <div className='bg-amber-200'>
        <Navbar/>
      <div className="text-center  min-w-auto p-8">
        <h1>Donate Us For Poor People</h1>
        <h3>When you give, they live</h3>
        <p className="text-black font-semibold">
          <strong>
            At Talukdar Auto Rice Mill, we are committed not only to producing quality rice but also to serving humanity. 
            With this mission in mind, we have established a charity fund that focuses on supporting underprivileged individuals 
            and families by providing them with essential food, shelter, and basic necessities. 
            This initiative is more than just an act of kindness — it is a long-term commitment to uplift lives and 
            foster a sense of dignity for those who are struggling.
            <br /><br />
            Our charity efforts are managed directly by our team at Talukdar Auto Rice Mill to ensure transparency, 
            accountability, and genuine impact. We regularly organize food distributions, arrange temporary shelters, 
            and extend emergency support during times of crisis. Whether it&apos;s a child who needs a warm meal, 
            an elderly person who needs a safe place to sleep, or a family facing unexpected hardship — 
            our goal is to be there when it matters most.
            <br /><br />
            We firmly believe that no one should go to bed hungry or live without a roof over their head, and through this fund, 
            we aim to turn that belief into action. Every small donation makes a big difference. 
            When you support our charity fund, you&apos;re not just giving — you&apos;re saving lives, restoring hope, 
            and building a more compassionate future for our community.
          </strong>
        </p>
      </div>
    </div>

      <div className="bg-amber-100 min-w-auto text-center pb-0">
        <p className="text-black p-8">
          Imagine going to sleep hungry. Imagine having no roof above your head, no warm meal to comfort you, 
          no place to feel safe. For many, this is not just imagination — it&apos;s their everyday reality.
          <br /><br />
          At <strong>Talukdar Auto Rice Mill</strong>, we do more than produce rice — we nurture hope. 
          We&apos;ve opened our hearts and created a charity fund to help the most vulnerable around us: 
          the children with no meals, the elderly with no shelter, and families who&apos;ve lost everything but their will to survive.
          <br /><br />
          Every single day, with your help, we provide warm food, a safe place to rest, and the dignity every human deserves. 
          But we cannot do this alone.
          <br /><br />
          We need your hand. Your heart. Your support.
          <br /><br />
          Because when you give — even a little — <strong>you&apos;re not just donating money. 
          You&apos;re feeding someone&apos;s hunger, sheltering someone&apos;s fear, and restoring someone&apos;s faith in humanity.</strong>
          <br /><br />
          Let&apos;s build a world where no one sleeps on an empty stomach. Let&apos;s light up the lives that have been lost in darkness.
        </p>
        <h4 className="pb-4">Donate today. Be the reason someone smiles tomorrow.</h4>
      </div>

      <div className="bg-amber-300 pt-0 p-8 text-center min-w-auto security">
        <h2>Donation Security &amp; Fund Usage Statement</h2>
        <p className="text-black">
          At <strong>Talukdar Auto Rice Mill</strong>, we value your trust above all else. 
          Every donation you make is used exclusively for our charity fund, 
          which supports underprivileged individuals by providing food, shelter, clothing, and emergency aid.
          <br /><br />
          We want to be fully transparent:
          <br />
          ✅ 98% of your donation goes directly to charitable activities.
          <br />
          ❗Only 2% is reserved for necessary withdrawal and transaction fees (bank processing, payment gateway charges, etc.).
          <br /><br />
          We do not use your money for profit, personal gain, or internal business.
          Our goal is simple — to uplift lives with honesty, compassion, and integrity.
          <br /><br />
          <strong>
            Thank you for your kindness and support.
            <br />
            Together, we make hope possible.
          </strong>
        </p>
      </div>
      <div className="p-8 bg-fuchsia-500">
      <Container>
        <Row>
          <Col>
            <div className="bg-transparent text-center text-white">
              <h1>BANGLADESH</h1>
              <h4>Cellfin</h4>
            <p className=''> <strong>01908767162</strong> </p>

              <p className="mt-4 font-semibold">bKash Merchant Number:</p>
              <p className="text-xl font-bold">01750433879</p>

              <div className="mx-auto mt-4 inline-block bg-white p-4 rounded shadow">
                <QRCodeSVG
  value="https://qr.bka.sh/28101400001XdeGSTAwXFC4877A8"
  size={200}
  level="H"
  includeMargin={true}
/>
              </div>
            </div>
            
          </Col>

          <Col>
            <div className="text-center text-white">
              <h1>INTERNATIONAL</h1>
              <p className='text-black'>Comming soon...</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
    
    </>
  );
};

export default Donate;
