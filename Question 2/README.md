-----------Employee-----------
------------------------------
- managerFlag: boolean
- name: string
- dateHired: Date
- id: int
- partTimeFlag: boolean ---> New Field
------------------------------
+ getName(): String
+ getID(): String
+ getDateHired(): Date
+ isManager(): Boolean
+ isPartTime(): Boolean ---> New Function

I can add new Function isPartTime() to check if this employee can work in part time.
Also, I need to add new flat that was named partTimeFlag.