#   This class is used to perform the mathematical operations.

class MathInterPreter(object):

    def __init__(self):
        pass

    def Addition(self, x, y):
        return x + y

    def Subtraction(self, x, y):
        return x - y

    def Multiplication(self, x, y):
        return x * y

    def Division(self, x, y):
        return x / y
    
    def Exponentiation(self, x:int, y:int):

        """
            Title       :   Exponentiation
            Description :
                Defining a function to calculate the Exponentiation.
                The formula of Exponentiation we use the formula x ** y.
        
            :param x: Base (x)
            :param y: Exponent (y)
            :return: Exponentiation
        """
        
        return x ** y

    def Energy(self, m:int):
        """
            Title       :   EnergyMeasured
            Description :
                Defining a function to calculate the Energy.
                The formula of Energy we use the formula E = ms2.
                m = Mass (kg) * s = Speed of light which is 3*10**8

            :param m: Mass (kg)
            :param c: Speed of light which is 3*10**8
            :return: Energy
        """

        #   Calculating the Speed of light
        c = self.Multiplication(3, self.Exponentiation(10, 8))

        return self.Multiplication(m, self.Exponentiation(c, 2))

    def SpeedCalculation(self, d:int, t:int):
        """
            Title       :   SpeedMeasured
            Description :
                Defining a function to calculate the Speed.
                The formula of Speed we use the formula S = d/t.
                d = Distance (m) * t = Time (s)

            :param d: Distance (m)
            :param t: Time (s)
            :return: Speed
        """

        return self.Division(d, t)
