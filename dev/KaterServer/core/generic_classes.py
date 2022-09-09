class GenericException(Exception):
    def __init__(self, code, name, message):
        super().__init__()
        self.code = code
        self.name = name
        self.message = message