# KaterMain database

1. BranchM
	id(M smallInt), branchName, isActive

2. HallM
	id(M, smallInt), branchId, hallName, cancelChargeInPerc, remarks, isActive

3. CustomerM
	id(A, int), custName, address1, address2, pin, primaryPhone, otherPhones, stateId, cityId, email, remarks, jData, anniversaryDate, gstin, dateOfBirth, timestamp, custType(char I or B for individual or business), reference, jData,

4. DateTypeM (Populate by script) also interface
	id(M, smallint), dateTypeName, remarks
	e.g marriage normal, marriage premium, Tilak, Holiday, Normal

5. DateTypeD 
	id(A, int), mdate, dateTypeId

6. EventTypeM (Populate by script) also interface
	id(M, smallInt), eventTypeName, remarks, percentAdvance
	e.g Marriage, Office party, Birthday, Get together

7. StateM (Populate by script) (Populate by script) also interface
	id(M, tinyInt), stateName, stateCode, isActive

8. CityM (Populate by script) also interface
	id(M, smallInt), stateId, cityName, isActive

9. TableIdCounter
	id(M, tinyInt), tableName, lastId(int)

10. GlobalSettings
	id(M, smallInt), key, textValue, numericValue, jData, timestamp

11. BranchSettings
	id(M, smallInt), branchId, key, textValue, numericValue, jData, timestamp

12. Notes
	id(A, int)branchId, notesDate, endDate, remarks, jData, isCompleted

13. TimeSlotM (Populate by script) also interface
	id(M, tinyInt), timeSlotName, remarks, startTime, endTime

14. UnitM (Populate by script) also interface
	id(M, tinyInt), unitName, remarks

15. BookingNoCounter
	id(A,int), branchId, lastBookingNo

16. Enquiry
	id(A, int), tranDate, eventDate, hallId, custId, remarks, jData, timestamp  

17. MenuM
	id(A, int), menuName, remarks, jData, timestamp, isActive

18. DepartmentM
	id(A, int), depName, remarks, timestamp, branchId, isActive, isInternal, inchargeName, mobileNo

19. MenuItemM
	id(A, int), recipeName, remarks, ingredients, image, points, unitId, customSortId(tinyInt), jData, timestamp, menuId, departmentId, parentId, isActive

20. BookingPriorityM (Populate by script)
	id(M, tinyInt), priority, priorityName
	light, medium, heavy

21.	BookingActionM (Populate by script)
	id(M, tinyInt), actionName, remarks

22.	BookingStatusM (Populate by script)
	id(M, tinyInt), statusName, remarks
	
23. BookingMain
	id(A, bigint), bookDate, custId, currentStatusId, isCancellable, cancellationCharge, commonRemarks, weightId, jData, timestamp, finalBillAmount, custReferenceId, custGuaranterId, custRelationId

24. BookingHall
	id(A, bigint), bookingMainId, eventDate, eventTypeId, hallId, timeSlotId, startTime, endTime, lineRemarks, menuId, pax, boardToRead, quotedRate, finalRate

25. BookingHallFoodItem
	id(A, bigInt), bookingHallId, recipeId, departmentId, points, remarks

26. BookingReceipt
	id(A, BigInt), bookingHeaderId, tranDate, amount, dc, remarks

27.	BookingBill 
	id(A, BigInt), bookingHeaderId, tranDate, amount, remarks

28. BookingAction
	id(A, bigint), tranDate, bookingActionId, bookingStatusId, lineRemarks

29. BookingLog
	id(A, BigInt), bookingMainId, jData, timestamp




# User management
1. TenantM
	id(M, int), tenantName, tenantCode, remarks, isActive

2. RoleM
	id(M, smallInt), roleName, remarks

3. ControlM
	id(M, smallInt), hierarchy, remarks

4. RoleControlX
	id(A, int), controlId, roleId

5. UserM
	id(UUID), tenantId, roleId, userName, uid, hash, isActive, parentId, userEmail, remarks, timestamp
	id, tenantId unique
	id, roleId unique