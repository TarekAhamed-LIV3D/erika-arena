from abc import ABC, abstractmethod
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats
from statsmodels.graphics.mosaicplot import mosaic
import plotly.express as px

class MultiVariateAnalyzer(ABC):
    """Abstract base class for all multi-variate analysis strategies"""
    @abstractmethod
    def analyze(self, df: pd.DataFrame, features: list):
        pass
        
    def _validate_features(self, df: pd.DataFrame, features: list):
        """Helper method to validate features exist in dataframe"""
        missing = [f for f in features if f not in df.columns]
        if missing:
            raise ValueError(f"Features not found in DataFrame: {missing}")

# ========== Numerical Analysis Strategies ==========

class NumericalCorrelationAnalysis(MultiVariateAnalyzer):
    """Analyze correlation between numerical features"""
    def analyze(self, df: pd.DataFrame, features: list):
        self._validate_features(df, features)
        
        # Calculate correlation matrix
        corr = df[features].corr()
        
        # Plot heatmap
        plt.figure(figsize=(12, 8))
        sns.heatmap(corr, annot=True, cmap='coolwarm', center=0)
        plt.title("Numerical Features Correlation Matrix")
        plt.show()
        
        return corr

class NumericalPairPlotAnalysis(MultiVariateAnalyzer):
    """Pairwise relationships between numerical features"""
    def analyze(self, df: pd.DataFrame, features: list):
        self._validate_features(df, features)
        sns.pairplot(df[features])
        plt.suptitle("Pairwise Relationships of Numerical Features", y=1.02)
        plt.show()

# ========== Categorical Analysis Strategies ==========

class CategoricalFrequencyAnalysis(MultiVariateAnalyzer):
    """Analyze frequency distribution of categorical features"""
    def analyze(self, df: pd.DataFrame, features: list):
        self._validate_features(df, features)
        
        fig, axes = plt.subplots(nrows=len(features), figsize=(10, 5*len(features)))
        
        for i, feature in enumerate(features):
            if len(features) > 1:
                ax = axes[i]
            else:
                ax = axes
                
            value_counts = df[feature].value_counts()
            sns.barplot(x=value_counts.index, y=value_counts.values, ax=ax)
            ax.set_title(f"Distribution of {feature}")
            ax.tick_params(axis='x', rotation=45)
            
        plt.tight_layout()
        plt.show()
        
        return df[features].apply(lambda x: x.value_counts())

class CategoricalMosaicPlot(MultiVariateAnalyzer):
    """Mosaic plot for two categorical features"""
    def analyze(self, df: pd.DataFrame, features: list):
        if len(features) != 2:
            raise ValueError("Mosaic plot requires exactly 2 categorical features")
            
        self._validate_features(df, features)
        
        # Create contingency table
        crosstab = pd.crosstab(df[features[0]], df[features[1]])
        
        plt.figure(figsize=(12, 8))
        mosaic(df, features, gap=0.01, title='Mosaic Plot')
        plt.show()
        
        return crosstab

# ========== Mixed Data Type Strategies ==========

class NumericalCategoricalBoxPlot(MultiVariateAnalyzer):
    """Box plots for numerical vs categorical features"""
    def analyze(self, df: pd.DataFrame, features: list):
        if len(features) != 2:
            raise ValueError("Requires exactly 1 numerical and 1 categorical feature")
            
        self._validate_features(df, features)
        
        # Determine which feature is numerical
        numerical_feature = features[0] if pd.api.types.is_numeric_dtype(df[features[0]]) else features[1]
        categorical_feature = features[1] if numerical_feature == features[0] else features[0]
        
        plt.figure(figsize=(12, 6))
        sns.boxplot(x=categorical_feature, y=numerical_feature, data=df)
        plt.title(f"Distribution of {numerical_feature} by {categorical_feature}")
        plt.xticks(rotation=45)
        plt.show()

class NumericalCategoricalViolinPlot(MultiVariateAnalyzer):
    """Violin plots for numerical vs categorical features"""
    def analyze(self, df: pd.DataFrame, features: list):
        if len(features) != 2:
            raise ValueError("Requires exactly 1 numerical and 1 categorical feature")
            
        self._validate_features(df, features)
        
        numerical_feature = features[0] if pd.api.types.is_numeric_dtype(df[features[0]]) else features[1]
        categorical_feature = features[1] if numerical_feature == features[0] else features[0]
        
        plt.figure(figsize=(12, 6))
        sns.violinplot(x=categorical_feature, y=numerical_feature, data=df)
        plt.title(f"Distribution of {numerical_feature} by {categorical_feature}")
        plt.xticks(rotation=45)
        plt.show()

# ========== Time Series Strategies ==========

class TimeSeriesTrendAnalysis(MultiVariateAnalyzer):
    """Analyze trends over time with optional numerical features"""
    def analyze(self, df: pd.DataFrame, features: list):
        if len(features) < 1:
            raise ValueError("Requires at least 1 datetime feature")
            
        self._validate_features(df, features)
        
        datetime_feature = features[0]
        numerical_features = features[1:] if len(features) > 1 else None
        
        if numerical_features:
            df.set_index(datetime_feature)[numerical_features].plot(
                figsize=(12, 6),
                title="Time Series Trends"
            )
        else:
            df[datetime_feature].value_counts().sort_index().plot(
                kind='line',
                figsize=(12, 6),
                title=f"Frequency over Time - {datetime_feature}"
            )
        plt.show()

# ========== Analysis Runner ==========

class MultiVariateAnalyzerRunner:
    def __init__(self):
        self.strategies = {
            'numerical_correlation': NumericalCorrelationAnalysis(),
            'numerical_pairplot': NumericalPairPlotAnalysis(),
            'categorical_frequency': CategoricalFrequencyAnalysis(),
            'categorical_mosaic': CategoricalMosaicPlot(),
            'num_cat_boxplot': NumericalCategoricalBoxPlot(),
            'num_cat_violin': NumericalCategoricalViolinPlot(),
            'time_series': TimeSeriesTrendAnalysis()
        }
        
    def get_strategy(self, analysis_type: str) -> MultiVariateAnalyzer:
        if analysis_type not in self.strategies:
            raise ValueError(f"Unknown analysis type: {analysis_type}. Available types: {list(self.strategies.keys())}")
        return self.strategies[analysis_type]
        
    def analyze(self, df: pd.DataFrame, features: list, analysis_type: str):
        strategy = self.get_strategy(analysis_type)
        return strategy.analyze(df, features)

# ========== Usage ==========

if __name__ == "__main__":
    # Load the dataset (example with commented real usage)
    # df = pd.read_csv("your_data.csv")
    # Sample data creation
    data = {
        'age': np.random.randint(20, 70, 100),
        'income': np.random.normal(50000, 15000, 100).astype(int),
        'gender': np.random.choice(['Male', 'Female'], 100),
        'education': np.random.choice(['High School', 'College', 'Graduate'], 100),
        'purchase_date': pd.date_range('2020-01-01', periods=100, freq='D'),
        'satisfaction': np.random.randint(1, 6, 100)
    }
    df = pd.DataFrame(data)
    
    analyzer = MultiVariateAnalyzerRunner()
    
    # Example analyses
    print("=== Numerical Correlation ===")
    analyzer.analyze(df, ['age', 'income', 'satisfaction'], 'numerical_correlation')
    
    print("\n=== Categorical Frequency ===")
    analyzer.analyze(df, ['gender', 'education'], 'categorical_frequency')
    
    print("\n=== Numerical vs Categorical ===")
    analyzer.analyze(df, ['income', 'education'], 'num_cat_boxplot')
    
    print("\n=== Time Series Analysis ===")
    analyzer.analyze(df, ['purchase_date', 'income'], 'time_series')