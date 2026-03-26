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
    else:
        remaining_time = total_time % 86400
        total_time = \
            total_time // 86400 == 1 and "1 Day" or f"{total_time // 86400} Days"

    if remaining_time < 60:
        remaining_time = f"{remaining_time} Seconds"
    elif remaining_time < 3600:
        remaining_time = \
            remaining_time // 60 == 1 and "1 Minute" or f"{remaining_time // 60} Minutes"
    elif remaining_time < 86400:
        remaining_time = \
            remaining_time // 3600 == 1 and "1 Hour" or f"{remaining_time // 3600} Hours"
    else:
        remaining_time = \
            remaining_time // 86400 == 1 and "1 Day" or f"{remaining_time // 86400} Days"

    check = re.search(r'\d+', remaining_time)
    if int(check.group()) > 1:
        total_time = f"{total_time} and {remaining_time}"
        
    return total_time