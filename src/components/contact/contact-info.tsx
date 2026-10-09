export function ContactInfo() {
  return (
    <div className="flex flex-col gap-6 text-sm text-muted-foreground">
      <div>
        <h3 className="text-base font-semibold text-foreground">Contact Sales</h3>
        <p className="mt-1">T: (+44) 740 106 1188</p>
        <p>E: ask@forexaa.com</p>
      </div>
      <div>
        <h3 className="text-base font-semibold text-foreground">Service Hours</h3>
        <p>Monday to Friday : 9am – 7pm</p>
      </div>
      <div>
        <h3 className="text-base font-semibold text-foreground">Office Address</h3>
        <p>207 Regent St., London</p>
        <p>United Kingdom W1B 3HH</p>
      </div>
    </div>
  )
}
