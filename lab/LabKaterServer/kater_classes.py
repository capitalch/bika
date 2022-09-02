class GenericException(Exception):
    def __init__(self, code, name, description):
        self.code = code
        self.name = name
        self.description = description