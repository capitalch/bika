import logging
from redirect import datetime

# Logging levels are Debug:10, Info: 20, Warning: 30, Error: 40, Critical: 50
currentMonth = datetime.now().strftime("%b")
currentYear = datetime.now().year
logFormatStr = '%(asctime)s  %(levelname)s - %(message)s'
logging.basicConfig(
    filename=f'logs/{currentMonth}-{currentYear}.log', format=logFormatStr, level=logging.WARNING)

logger = logging
logger.info('logger initiated')