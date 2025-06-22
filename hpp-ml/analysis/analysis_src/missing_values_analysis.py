from abc import ABC, abstractmethod
import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns

# abstract class for missing values analysis
class MissingValuesAnalysis(ABC):
    @abstractmethod
    def analyze(self, df: pd.DataFrame):
        self.identify_missing_values(df)
        self.visualize_missing_values(df)
        
    def identify_missing_values(self, df: pd.DataFrame):
        # identify missing values in the dataframe
        pass
    
    def visualize_missing_values(self, df: pd.DataFrame):
        # visualize missing values in the dataframe
        pass
    
#class for missing value identification
class MissingValueIdentifier(MissingValuesAnalysis):
    def identify_missing_values(self, df: pd.DataFrame):
        # identify missing values in the dataframe
        print("\n Missing Values Count by Column:")
        missing_value = df.isnull().sum()
        print(missing_value[missing_value > 0])
        
    def visualize_missing_values(self, df: pd.DataFrame):
        # visualize missing values in the dataframe
        print("\nVisualizing missing values...")
        plt.figure(figsize=(16, 12))
        sns.heatmap(df.isnull(), cbar=False, cmap='viridis')
        plt.title('Missing Values Heatmap')
        plt.show()
        
#usage
if __name__ == "__main__":
    #load the data
    #df = pd.read_csv('data.csv')
    #MissingValuesAnalyzer = MissingValueIdentifier()
    #MissingValuesAnalyzer.analyze(df)
    pass