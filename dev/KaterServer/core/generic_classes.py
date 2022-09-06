class GenericException(Exception):
    def __init__(self, code, name, description):
        super().__init__()
        self.code = code
        self.name = name
        self.description = description