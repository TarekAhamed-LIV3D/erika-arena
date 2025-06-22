from abc import ABC, abstractmethod

#Define the Strategy interface
class PaymentMethod(ABC):
    @abstractmethod
    def pay(self, amount):
        pass
    
#Implement Concrete Strategies
class CreditCard(PaymentMethod):
    def pay(self, amount):
        print(f"Paying ${amount} using Credit Card")
        
class PayPal(PaymentMethod):
    def pay(self, amount):
        print(f"Paying ${amount} using PayPal")
        
class BankTransfer(PaymentMethod):
    def pay(self, amount):
        print(f"Paying ${amount} using Bank Transfer")
        
class Bitcoin(PaymentMethod):
    def pay(self, amount):
        print(f"Paying ${amount} using Bitcoin")
        
#Implement the context
class ShoppingCart:
    def __init__(self, payment_method:PaymentMethod):
        self.payment_method = payment_method
        
    def checkout(self, amount):
        return self.payment_method.pay(amount)
    
#use the strategy in the context
if __name__ == "__main__":
    cart = ShoppingCart(CreditCard())
    print(cart.checkout(100))
    
    cart = ShoppingCart(PayPal())
    print(cart.checkout(200))
    
    cart = ShoppingCart(Bitcoin())
    print(cart.checkout(300))