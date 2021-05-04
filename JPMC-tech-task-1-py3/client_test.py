import unittest
from client3 import getDataPoint, getRatio

class ClientTest(unittest.TestCase):
  def test_getDataPoint_calculatePrice(self):
    quotes = [
      {'top_ask': {'price': 121.2, 'size': 36}, 'timestamp': '2019-02-11 22:06:30.572453', 'top_bid': {'price': 120.48, 'size': 109}, 'id': '0.109974697771', 'stock': 'ABC'},
      {'top_ask': {'price': 121.68, 'size': 4}, 'timestamp': '2019-02-11 22:06:30.572453', 'top_bid': {'price': 117.87, 'size': 81}, 'id': '0.109974697771', 'stock': 'DEF'}
    ]
    """ ------------ Add the assertion below ------------ """
    for quote in quotes:
        top_bid = float(quote['top_bid']['price'])
        top_ask = float(quote['top_ask']['price'])
        price = round((top_bid+top_ask)/2, 2)
        self.assertEqual(getDataPoint(quote), (quote['stock'], top_bid, top_ask, price))

  def test_getDataPoint_calculatePriceBidGreaterThanAsk(self):
    quotes = [
      {'top_ask': {'price': 119.2, 'size': 36}, 'timestamp': '2019-02-11 22:06:30.572453', 'top_bid': {'price': 120.48, 'size': 109}, 'id': '0.109974697771', 'stock': 'ABC'},
      {'top_ask': {'price': 121.68, 'size': 4}, 'timestamp': '2019-02-11 22:06:30.572453', 'top_bid': {'price': 117.87, 'size': 81}, 'id': '0.109974697771', 'stock': 'DEF'}
    ]
    """ ------------ Add the assertion below ------------ """
    for quote in quotes:
        top_bid = float(quote['top_bid']['price'])
        top_ask = float(quote['top_ask']['price'])
        price = round((top_bid+top_ask)/2, 2)
        self.assertEqual(getDataPoint(quote), (quote['stock'], top_bid, top_ask, price))



  """ ------------ Add more unit tests ------------ """
  def test_getRatio_checkPricesEqualZero(self):
    self.assertEqual(getRatio(1, 0), None)
    self.assertEqual(getRatio(0, 0), None)

if __name__ == '__main__':
    unittest.main()
