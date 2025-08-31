def assert_required(obj, key):
    if key not in obj or obj[key] is None or (isinstance(obj[key], str) and obj[key].strip() == ""):
        raise ValueError(f"Missing required field: {key}")
