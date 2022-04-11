import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

import Card from '../../components/Card';
import Main from '../../layouts/Main';
import { firebaseDB } from '../../firebase';

import {
  MdLocalShipping,
  MdAvTimer,
  MdPending,
  MdDoneAll,
} from 'react-icons/md';
import PageTitle from '../../components/PageTitle';
import PageCard from './PageCard';

const IconStyle = {
  width: '1.8em',
  height: 'auto',
  fill: 'white',
};

const Dashboard = () => {
  const [pendingOrder, setPendingOrder] = useState(0);
  const [processingOrder, setProcessingOrder] = useState(0);
  const [shippingOrder, setShippingOrder] = useState(0);
  const [completedOrder, setCompletedOrder] = useState(0);

  useEffect(() => {
    const pendingQuery = query(
      collection(firebaseDB, 'orders'),
      where('status', '==', 'pending')
    );
    const processingQuery = query(
      collection(firebaseDB, 'orders'),
      where('status', '==', 'processing')
    );
    const shippingQuery = query(
      collection(firebaseDB, 'orders'),
      where('status', '==', 'shipping')
    );
    const completedQuery = query(
      collection(firebaseDB, 'orders'),
      where('status', '==', 'delivered')
    );

    const unSubPending = onSnapshot(pendingQuery, (querySnap) => {
      setPendingOrder(querySnap.docs.length);
    });

    const unSubProcessing = onSnapshot(processingQuery, (querySnap) => {
      setProcessingOrder(querySnap.docs.length);
    });

    const unSubShipping = onSnapshot(shippingQuery, (querySnap) => {
      setShippingOrder(querySnap.docs.length);
    });

    const unSubCompleted = onSnapshot(completedQuery, (querySnap) => {
      setCompletedOrder(querySnap.docs.length);
    });

    return () => {
      unSubPending;
      unSubProcessing;
      unSubShipping;
      unSubCompleted;
    };
  }, []);

  return (
    <>
      <Main>
        <PageTitle title="Dashboard" />

        {/* Cards */}
        <div className="grid grid-cols-1 gap-3 w-full sm:grid-cols-2 lg:grid-cols-4 mt-4">
          <Card title={'Pending Orders'} count={pendingOrder} color="#0275d8">
            <MdPending style={IconStyle} />
          </Card>
          <Card
            title={'Processing Orders'}
            count={processingOrder}
            color="#f0ad4e"
          >
            <MdAvTimer style={IconStyle} />
          </Card>
          <Card title={'Shipping Orders'} count={shippingOrder} color="#5bc0de">
            <MdLocalShipping style={IconStyle} />
          </Card>
          <Card
            title={'Completed Orders'}
            count={completedOrder}
            color="#5cb85c"
          >
            <MdDoneAll style={IconStyle} />
          </Card>
        </div>

        {/* Navigator Cards */}

        <div className="w-full mt-12">
          <PageTitle title="Pages" />

          <div className="mt-4 w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
            <PageCard title="Products" path="/products" />
            <PageCard title="Orders" path="/orders" />
          </div>
        </div>
      </Main>
    </>
  );
};

export default Dashboard;
