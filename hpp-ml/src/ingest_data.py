import os
import zipfile
from abc import ABC, abstractmethod
import pandas as pd

#Define an abstract class for Data ingestor
class DataIngestor(ABC):
    @abstractmethod
    def ingest(self, file_path: str) -> pd.DataFrame:
        pass
    
class ZipDataIngestor(DataIngestor):
    def ingest(self, file_path: str) -> pd.DataFrame:
        if not file_path.endswith('.zip'):
            raise ValueError("File path must end with .zip")
        
        with zipfile.ZipFile(file_path, 'r') as zip_ref:
            zip_ref.extractall("extracted_data")
            
        extracted_files = os.listdir("extracted_data")
        csv_files = [f for f in extracted_files if f.endswith('.csv')]
        
        if len(csv_files) == 0:
            raise FileNotFoundError("No CSV files found in the zip file")
        if len(csv_files) > 1:
            raise ValueError("Multiple CSV files found in the zip file")
        
        csv_files_path = os.path.join("extracted_data", csv_files[0])
        df = pd.read_csv(csv_files_path)
        
        return df
    
#implement a factory to create DataIngestor instances
class DataIngestorFactory:
    @staticmethod
    def get_data_ingestor(file_extension: str) -> DataIngestor:
        if file_extension.endswith('.zip'):
            return ZipDataIngestor()
        else:
            raise ValueError(f"Unsupported file type. Only zip files are supported: {file_extention}") 
        
#example
if __name__ == "__main__":
    #file_path = "erika-arena/hpp-ml/data/archive.zip"
    
    #file_extension = os.path.splitext(file_path)[1]
    
    #data_ingestor = DataIngestorFactory.get_data_ingestor(file_extension)
    
    #df = data_ingestor.ingest(file_path)
    
    #print (df.head())
    
    pass