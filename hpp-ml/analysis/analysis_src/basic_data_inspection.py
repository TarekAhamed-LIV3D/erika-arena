from abc import ABC, abstractmethod
import pandas as pd

#Abstract class for data inspection
class DataInspectionStrategy(ABC):
    @abstractmethod
    def inspect(self, data: pd.DataFrame):
        pass
    
class DataTypeInspectionStrategy(DataInspectionStrategy):
    def inspect(self, df: pd.DataFrame):
        print("\nData type inspection:")
        print(df.dtypes)
        print(df.info())
        
#Summary Statistics Inspection
class SummaryStatisticsInspectionStrategy(DataInspectionStrategy):
    def inspect(self, df: pd.DataFrame):
        print("\nSummary statistics inspection(Numerical):")
        print(df.describe())
        print("\nSummary statistics inspection(Categorical):")
        print(df.describe(include=["0"]))
        
#use of DataInspectionStrategy
class DataInspector:
    def __init__(self, strategy: DataInspectionStrategy):
        self.strategy = strategy
        
    def set_strategy(self, strategy: DataInspectionStrategy):
        self.strategy = strategy
        
    def execute_inspection(self, df: pd.DataFrame):
        self.strategy.inspect(df)
        
#Uses
if __name__ == "__main__":
    #load data
    #df = pd.read_csv("data.csv")
    
    #using data inspector with specific strategy
    #inspector = DataInspector(DataTypeInspectionStrategy())
    #inspector.execute_inspection(df)
    
    #using strategy for summary statistics 
    #inspector.set_strategy(SummaryStatisticsInspectionStrategy())
    #inspector.execute_inspection(df)
    pass
        