import re

def create_total_time(total_time):
    if not total_time:
        return

    if total_time < 60:
        total_time = f"{total_time} Seconds"
    elif total_time < 3600:
        remaining_time = total_time % 60
        total_time = \
            total_time // 60 == 1 and "1 Minute" or f"{total_time // 60} Minutes"
    elif total_time < 86400:
        remaining_time = total_time % 3600
        total_time = \
            total_time // 3600 == 1 and "1 Hour" or f"{total_time // 3600} Hours"
    elif total_time < 604800:
        remaining_time = total_time % 86400
        total_time = \
            total_time // 86400 == 1 and "1 Day" or f"{total_time // 86400} Days"
    elif total_time < 2592000:
        remaining_time = total_time % 604800
        total_time = \
            total_time // 604800 == 1 and "1 Week" or f"{total_time // 604800} Weeks"
    elif total_time < 31536000:
        remaining_time = total_time % 2592000
        total_time = \
            total_time // 2592000 == 1 and "1 Month" or f"{total_time // 2592000} Months"
    else:
        remaining_time = total_time % 31536000
        total_time = \
            total_time // 31536000 == 1 and "1 Year" or f"{total_time // 31536000} Years"

    if remaining_time < 60:
        remaining_time = f"{remaining_time} {remaining_time > 1 and 'Seconds' or 'Second'}"
    elif remaining_time < 3600:
        remaining_time = \
            remaining_time // 60 == 1 and "1 Minute" or f"{remaining_time // 60} Minutes"
    elif remaining_time < 86400:
        remaining_time = \
            remaining_time // 3600 == 1 and "1 Hour" or f"{remaining_time // 3600} Hours"
    elif remaining_time < 604800:
        remaining_time = \
            remaining_time // 86400 == 1 and "1 Day" or f"{remaining_time // 86400} Days"
    elif remaining_time < 2592000:
        remaining_time = \
            remaining_time // 604800 == 1 and "1 Week" or f"{remaining_time // 604800} Weeks"
    elif remaining_time < 31536000:
        remaining_time = \
            remaining_time // 2592000 == 1 and "1 Month" or f"{remaining_time // 2592000} Months"
    else:
        remaining_time = \
            remaining_time // 31536000 == 1 and "1 Year" or f"{remaining_time // 31536000} Years"

    check = re.search(r'\d+', remaining_time)
    if int(check.group()) > 0:
        total_time = f"{total_time} and {remaining_time}"
        
    return total_time