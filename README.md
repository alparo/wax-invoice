# WAX-Invoice
The main goal of this simple script is to let people create invoices for payment in WAX(P).
It utilises GET parameters to fill in necessary fields. So you can create such link and send it to someone who is eager
to pay you:

https://example.com/?to=recipient.wam&amount=15&memo=donation

Opening this URL will result in pre-filling fields, so the recipient will be 'recipient.wam', payer will pay 15 WAXP
and the memo will be 'donation'. Currently, this script supports only WAXP tokens.

Firstly, the payer will have to log in with WAX cloud wallet. Only then the user should press the 'Sign transaction'
button. 

# TODOs:

* possibility to prepare such URL by just filling fields on separate page;
* possibility to set the name of the invoice;
* hide 'sign transaction' button till users logs in;
* ~~more beautiful interface;~~
* possibility to input memo before paying if the memo wasn't set by recipient;
* support for Anchor wallet.

Code contributions and donations are totally welcome!