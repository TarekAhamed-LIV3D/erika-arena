from abc import ABC, abstractmethod

#Product Interface
class Coffee(ABC):
    @abstractmethod
    def prepare(self):
        pass

#Implement Products
class Espresso(Coffee):
    def prepare(self):
        return "Preparing a rich and strong Espresso"
    
class Latte(Coffee):
    def prepare(self):
        return "Preparing a creamy and smooth Latte"

class Cappuccino(Coffee):
    def prepare(self):
        return "Preparing a strong, rich, frothy Cappuccino"
    
#Implement the Coffee Machine
class CoffeeMachine:
    def make_coffee(self, coffee_type):
        if coffee_type == "Espresso":
            return Espresso().prepare()
        elif coffee_type == "Latte":
            return Latte().prepare()
        elif coffee_type == "Cappuccino":
            return Cappuccino().prepare()
        else:
            return "Sorry, we don't have that type of coffee"
        
#Use the Coffee Machine for different types of coffee
if __name__ == "__main__":
    coffee_machine = CoffeeMachine()
    
    coffee = coffee_machine.make_coffee("Espresso")
    print(coffee)
    
    coffee = coffee_machine.make_coffee("Latte")
    print(coffee)
    
    coffee = coffee_machine.make_coffee("Cappuccino")
    print(coffee)