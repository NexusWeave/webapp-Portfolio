class Algorithms(object):
    pass

class Search(Algorithms):

    def linear(self, array:list, n:int, x:str):
        """ Searching through every elements Time Complexity Olog(n)"""

        for i in range(0, n):

            #   Ensure that the array is equal to the known character
            if array[i] == x: return array[i]

        return False
