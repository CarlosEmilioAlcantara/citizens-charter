def serialize_value(value):
    if isinstance(value, (int, float, str, bool)) or value is None:
        return value
    return str(value)