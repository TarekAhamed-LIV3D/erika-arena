from abc import ABC, abstractmethod
import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns 

#Abstract class
class UnivariateAnalysisStrategy(ABC):
    @abstractmethod
    def analyze(self, df: pd.DataFrame, feature:str):
        pass

class NumericalUnivariateAnalysis(UnivariateAnalysisStrategy):
    def analyze(self, df: pd.DataFrame, feature:str):
        plt.figure(figsize=(10,6))
        sns.histplot(df[feature], kde=True, bins=30)
        plt.title(f"Histogram of {feature}")
        plt.xlabel(feature)
        plt.ylabel("Frequency")
        plt.show()
        
class CategoricalUnivariateAnalysis(UnivariateAnalysisStrategy):
    def analyze(self, df: pd.DataFrame, feature:str):
        plt.figure(figsize=(10,6))
        sns.countplot(x=feature, data=df, palette="muted")
        plt.title(f"Count of {feature}")
        plt.xlabel(feature)
        plt.ylabel("Count")
        plt.xticks(rotation=45)
        plt.show()
        
class UnivariateAnalyze:
    def __init__(self, strategy: UnivariateAnalysisStrategy):
        self.strategy = strategy
        
    def set_strategy(self, strategy: UnivariateAnalysisStrategy):
        self._strategy = strategy
        
    def execute_analysis(self, df: pd.DataFrame, feature: str):
        self.strategy.analyze(df, feature)

if __name__ == "__main__":
    #df = pd.read_csv('file')
    #analyzer = UnivariateAnalyze(NumericalUnivariateAnalysis())
    #analyzer.execute_analysis(df, 'SalePrice')
    
    #analyzer.set_strategy(CategoricalUnivariateAnalysis())
    #analyzer.execute_analysis(df, 'Neighborhood')
    pass