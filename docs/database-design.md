# KaterMain database

1. BranchM
	id(M smallInt), branchName, isActive

2. HallM
	id(M, smallInt), branchId, hallName, cancelChargeInPerc, descr, isActive

3. CustomerM
	id(A, int), custName, address1, address2, pin, primaryPhone, otherPhones, stateId, cityId, email, descr, jData, anniversaryDate, gstin, dateOfBirth, timestamp, custType(char I or B for individual or business), reference, jData,

4. DateTypeM
	id(M, smallint), dateTypeName, descr

5. DateTypeD
	id(A, int), mdate, dateTypeId

6. EventTypeM
	id(M, smallInt), eventTypeName, descr, percentAdvance

7. StateM
	id(M, tinyInt), stateName, stateCode, isActive

8. CityM
	id(M, smallInt), stateId, cityName, isActive

9. TableIdCounter
	id(M, tinyInt), tableName, lastId(int)

10. GlobalSettings
	id(M, smallInt), key, textValue, numericValue, jData, timestamp

11. BranchSettings
	id(M, smallInt), branchId, key, textValue, numericValue, jData, timestamp

12. Notes
	id(A, int)branchId, notesDate, endDate, remarks, jData, isCompleted

13. TimeSlotM
	id(M, tinyInt), timeSlotName, descr, startTime, endTime

14. UnitM
	id(M, tinyInt), unitName, descr

15. BookingNoCounter
	id(A,int), branchId, lastBookingNo

16. Enquiry
	id(A, int), tranDate, eventDate, hallId, custId, remarks, jData, timestamp  

17. MenuM
	id(A, int), menuName, descr, jData, timestamp, isActive

18. DepartmentM
	id(A, int), depName, descr, timestamp, branchId, isActive

19. RecipeM
	id(A, int), recipeName, descr, ingredients, image, points, unitId, customSortId(tinyInt), jData, timestamp, menuId, departmentId, parentId, isActive

20. BookingWeightM
	id(M, tinyInt), weight, weightName
	light, medium, heavy

22.	BookingActionM
	id(M, tinyInt), actionName, remarks

23.	BookingStatusM
	id(M, tinyInt), statusName, remarks
	
24. BookingMain
	id(A, bigint), bookDate, custId, currentStatusId, isCancellable, cancellationCharge, commonRemarks, weightId, jData, timestamp, finalBillAmount

25. BookingHall
	id(A, bigint), bookingMainId, eventDate, eventTypeId, hallId, timeSlotId, lineemarks, menuId, pax, boardToRead, quotePriceRate, finalPriceRate

26. BookingHallRecipe
	id(A, bigInt), bookingHallId, recipeId, departmentId, points

27. BookingReceipt
	id(A, BigInt), bookingHeaderId, tranDate, amount, dc, remarks

28.	BookingBill
	id(A, BigInt), bookingHeaderId, tranDate, amount, remarks

29. BookingActionTran
	id(A, bigint), tranDate, remarks, bookingActionId, bookingStatusId, lineRemarks

30. BookingLog
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