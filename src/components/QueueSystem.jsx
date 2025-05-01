import React, { useState, useEffect } from 'react';

const QueueSystem = () => {
  const [queue, setQueue] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState(0);

  // Average preparation time per item in minutes
  const AVERAGE_PREP_TIME = 5;

  // Mock function to generate a sample order (this would be replaced with real order data)
  const createSampleOrder = () => {
    return {
      id: Date.now(),
      items: [
        { name: "Sample Item 1", quantity: 1 },
        { name: "Sample Item 2", quantity: 1 }
      ],
      status: 'waiting',
      timestamp: new Date(),
    };
  };

  const addNewOrder = () => {
    const newOrder = createSampleOrder();
    setQueue([...queue, newOrder]);
  };

  const addToQueue = (order) => {
    const newOrder = {
      id: Date.now(),
      items: order.items,
      status: 'pending',
      estimatedTime: calculateEstimatedTime(order.items),
      timestamp: new Date(),
    };
    setQueue([...queue, newOrder]);
  };

  const calculateEstimatedTime = (items) => {
    return items.length * AVERAGE_PREP_TIME;
  };

  const processNextOrder = () => {
    if (queue.length > 0) {
      const nextOrder = queue[0];
      setCurrentOrder(nextOrder);
      setQueue(queue.slice(1));
      setEstimatedTime(nextOrder.estimatedTime);
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setQueue(queue.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  useEffect(() => {
    // Update estimated times every minute
    const interval = setInterval(() => {
      setQueue(queue.map(order => ({
        ...order,
        estimatedTime: Math.max(0, order.estimatedTime - 1)
      })));
    }, 60000);

    return () => clearInterval(interval);
  }, [queue]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Order Status</h2>
        <button
          onClick={addNewOrder}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <span className="mr-2">+</span>
          Add Order
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Order List */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-4">Order ID</h3>
            {queue.map((order) => (
              <div
                key={order.id}
                className="p-4 border rounded-lg hover:border-blue-500 transition-colors"
              >
                <p className="font-medium">#{order.id}</p>
                <p className="text-sm text-gray-600">
                  {order.items.length} items
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(order.timestamp).toLocaleTimeString()}
                </p>
              </div>
            ))}
          </div>

          {/* Status Indicators */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-4">Status</h3>
            {queue.map((order) => (
              <div key={order.id} className="p-4 flex items-center space-x-4">
                <button
                  className={`px-4 py-2 rounded-lg ${
                    order.status === 'running'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 hover:bg-green-500 hover:text-white'
                  }`}
                  onClick={() => updateOrderStatus(order.id, 'running')}
                >
                  Running
                </button>
                <button
                  className={`px-4 py-2 rounded-lg ${
                    order.status === 'waiting'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-gray-200 hover:bg-yellow-500 hover:text-white'
                  }`}
                  onClick={() => updateOrderStatus(order.id, 'waiting')}
                >
                  Waiting
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueueSystem; 