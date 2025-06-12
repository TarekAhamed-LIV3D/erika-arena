from abc import ABC, abstractmethod
import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns 

#Abstract class for Bivariate Analysis
class VariateAnalysis(ABC):
    @abstractmethod
    def analyze(self, df: pd.DataFrame, feature1: str, feature2: str):
        pass
    
#Strategy analyzes the relationship between two features using a scatter plot
class NumericalVsNumerical(VariateAnalysis):
    def analyze(self, df: pd.DataFrame, feature1: str, feature2: str):
        #Create a scatter plot
        plt.figure(figsize=(10,6))
        sns.scatterplot(x=feature1, y=feature2, data=df)
        plt.title(f"Scatter Plot of {feature1} vs {feature2}")
        plt.xlabel(feature1)
        plt.ylabel(feature2)
        plt.show()
        
#Strategy analyzes the relationship between categorical and numerical using a scatter plot
class CategoricalNumericalStrategy(VariateAnalysis):
    def analyze(self, df: pd.DataFrame, feature1: str, feature2: str):
        #Create a scatter plot
        plt.figure(figsize=(10,6))
        sns.scatterplot(x=feature1, y=feature2, data=df)
        plt.title(f"Scatter Plot of {feature1} vs {feature2}")
        plt.xlabel(feature1)
        plt.ylabel(feature2)
        plt.xticks(rotation=45)
        plt.show()
        
#class to perform bivariate analysis
class BivariateAnalysisRunner:
    def __init__(self, strategy: VariateAnalysis):
        self.strategy = strategy
        
    def set_strategy(self, strategy: VariateAnalysis):
        self.strategy = strategy
    
    def execute_analysis(self, df: pd.DataFrame, feature1: str, feature2: str):
        self.strategy.analyze(df, feature1, feature2)
        
#usage
if __name__ == "__main__":
    #Load the dataset
    #df = pd.read_csv("your_data.csv")
    
    #analyzer = BivariateAnalysisRunner(NumericalVsNumerical())
    #analyzer.execute_analysis(df, "feature1", "feature2")
    
    #analyzer.set_strategy(CategoricalNumericalStrategy())
    #analyzer.execute_analysis(df, "feature1", "feature2")
    pass