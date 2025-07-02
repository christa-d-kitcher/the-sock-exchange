# from datetime import datetime

# def generate_socks():
#     # Define the sock template
#     sock_template = {
#         "sockDetails": {
#             "size": "Large",
#             "color": "Yellow",
#             "pattern": "Plain",
#             "material": "Bamboo",
#             "condition": "Used",
#             "forFoot": "Both"
#         },
#         "additionalFeatures": {
#             "waterResistant": False,
#             "padded": False,
#             "antiBacterial": True
#         },
#         "addedTimestamp": datetime.now().isoformat()
#     }

#     # Create a list of three socks based on the template
#     socks = [sock_template.copy() for _ in range(3)]

#     # Assign a unique timestamp to each sock
#     for sock in socks:
#         sock['addedTimestamp'] = datetime.now().isoformat()

#     return socks

# # Example usage
# socks = generate_socks()
# print(socks)


# from datetime import datetime

# def generate_socks(num_socks, **kwargs):
#     # Define the default sock template
#     default_template = {
#         "sockDetails": {
#             "size": "Large",
#             "color": "Yellow",
#             "pattern": "Plain",
#             "material": "Bamboo",
#             "condition": "Used",
#             "forFoot": "Both"
#         },
#         "additionalFeatures": {
#             "waterResistant": False,
#             "padded": False,
#             "antiBacterial": True
#         }
#     }

#     # Update the default template with any provided keyword arguments
#     for key in kwargs:
#         if key in default_template:
#             default_template[key].update(kwargs[key])

#     # Create a list of socks based on the updated template
#     socks = []
#     for _ in range(num_socks):
#         sock = default_template.copy()
#         sock['addedTimestamp'] = datetime.now().isoformat()
#         socks.append(sock)

#     return socks

# # Example usage with additional parameters to customize the socks
# custom_socks = generate_socks(3, sockDetails={'color': 'Red'}, additionalFeatures={'waterResistant': True})
# print(custom_socks)


from datetime import datetime

def generate_socks(*args, **kwargs):
    # Define the default sock template
    default_template = {
        "sockDetails": {
            "size": "Large",
            "color": "Yellow",
            "pattern": "Plain",
            "material": "Bamboo",
            "condition": "Used",
            "forFoot": "Both"
        },
        "additionalFeatures": {
            "waterResistant": False,
            "padded": False,
            "antiBacterial": True
        }
    }

    # Update the default template with any provided keyword arguments
    for key in kwargs:
        if key in default_template:
            default_template[key].update(kwargs[key])

    # Create a list of socks based on the updated template
    socks = []
    for _ in range(args[0]):
        sock = default_template.copy()
        sock['addedTimestamp'] = datetime.now().isoformat()
        socks.append(sock)

    return socks

# Example usage with additional parameters to customize the socks
custom_socks = generate_socks(3, sockDetails={'color': 'Red'}, additionalFeatures={'waterResistant': True})
print(custom_socks)