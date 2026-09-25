// ==UserScript==
// @name         FL Tools Basic
// @namespace    https://github.com/Typical-Bits
// @version      0.0.8
// @description  Simple everyday browsing tools for FetLife.
// @author       TypicalBits
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAOiklEQVR4nL2be5RV1X3HP/vce4e5M8O8Hwwz4EIUSSrCEAWnigoVRJTCYhHb2NCY1C61q1lJmpXGpKgpkkRimhITXbHt6sNYlzYxiEgTHkERo3EFQ1ArIBgsrwDzHuZ1X2f3j3PPOXvvc869d4D0h3Nnn99+/b7f3+Oc2ecqKC6itXXqXMsSK4AFAloRoh2oBBD4n+6vkkQ6H7KQTqr9Mv+fdLvcCUjnYhg4btvytBDiVdtmc3f3qV8XBVeor61t6sdBPAzM8AYLFbIIrKAREiIG5AgidOBSmu1IEoy2PCQla7u6Tj/vDTRBhimnTJky3c6KZ7CYB8IfFAE+ALoQrVJtSkMf4f1QQgzgWnQEyPilZck7z5w5c9Q0J2Dq5MlTrweeF4JmH7wKNgK4tpII5UAqn2pT+g2Kk+CmgtouGAVuBPXYtryjp+fMrkgC2traFkoZ2yYgoXnbaxtEaPjHUwAMMkr1vkJCsVQII0MImbZtsaS7+/Rut8+zuqXlkmmxGG8KZNP4wKspEmiEwg5Ng0A0FAJukFAkCtRoAHrAvrarq+sIgOVabFnyWZBNOrYI8IJ8VgiXAxDOVUzCR4eH3CHGT36GMMkMIVdplSGZOTri7+eNUBvCmKWMUwZKSQNYT7kTLIDJk6fcIQTz9GKmRoEBXt3IiIKWTJqrhgfzIM0ff4pKhAisrW9sI+gcGqQml1W4ErpxAVbClUKAlHQ2NzevcgkQwDp1nL5ukFkVvOYVIZg32E9rKhUZAR4ZmEBUEvT1y22b9nSK2SPDUQgVL6u66Lpk22I9gNXaOuVjIGboFT3ofdWgYNsBVZvNcvnIMBPsHDGJAlagwDXSSychsDZQZecQQMfwEDEptbHhUVs4DfIys6mpqcMCVmjY9Wn+gpFEOC0LmDU0SELaWEBresz3vMeDTkSABMN41wFt6TQA1bksM8dGlVHCNDgMRKRSSrHCAq6PHB5IL51pdf8JtqQtNeaNddqBBFCICCFB9VJe4ZCZ8ta9NDUakQQRXISmhtdcYAkh2sLCPzKcNNL9sTW5DLXZjNczY2SIibmsngUKEWEkuIurOzZn0lyiENuYyVCVy4WkAeEMRNIFQJsFtBYdquWkHvquKpnLUZ7L+YanU0wbHcEHLbQ81IFH7z9zZJjaXNa7Tto2Sdv21zDtCvwuJKItDlQF1FHzQ1POMSQhJQlpe9qEbXNDbxdxJBkhGI7F6Y8n6EsklIcZd75ECoGQNk2ZDNWZDJW5HBNkjs5zA1jKBHMfz2BZVOXeAlWpivuIxydm2Fn4T1WuVOayLO46DcCYFWMwnuBwZRX7q2s4Z8Ud4PmxjZk0HYMDTBsbYWI2S5kJMi8xJPFSDQz9+0/vLLhWoZQwJSMEWSEok+G7lts5ytM5mtNjzB3sY0dDC0eSFcSQXHlukBv7uolHzDX3yRS4v49XSiIzKH6euXmYtizSlkWZHe45VZK5HIu7z9AysYaqXJYZI0MlgQcYExYpYcba+ct5EhCU9tQolUoRLCZJO8f8gd5x79OQy9KSSdMTvzimnx+V6t/a+d8fGRpElOjFC5Ey22bG2MhFW68gAYXgqH1JO0dLKhU59mLLNOW54PzEt94yrsMui65VPo7QvxhSUUKdCQMRFqDRERDGggxTS1JWrLhBF1HGzCIYBrbEtbSVwifpJy7+0Y2vGRUWo/+PJDgFUDkjLPi7kEiswEL68VFwGTUK8iTYAg5VBh4ofy9iAweSFWFnqxFhX5gIPwLCj+sNnVn9/fbhikpGYr//KOiNJzg6oTy0rzBU9azQ1wZqgA7cO4rUV1cHSWfFo+UVvF1VXdCECxUbeGNiNWcTCe1YPCDjqOKWfiQdEv4qGWotkHoc5IA3q+s4Wzah9N3HKYfLk7yTrAwJf9PukFIdkSeWdqkd0yuLSpMHnQS3b8Sy2NzYwrHy5DhglSbvJivZWttAVkQ4fdz57xyrK88BZhSgXBnMGiQ4xdDRdCfK2FbfRF88URKwUuR42QR21NQxFIsFIjLg/VDM4fkPqHcBfawaBXrKm94PEtGVSPBcy2QOVVzYncFGsLdqIj9qaOJcLIZmqxGVAQChoIPsGHcBGQI8WAjD3uZoe0jojcXZVtfI+xWVlPDcFpCscMDvmljLkOWAVzeJikxvRMFC6L9hEq2T2qV7BCSUoyCt7SsCR1nmO0KMnoSUdAwNsGCgjwmlPMICw7EY22vqea88Sc7dK+LlaAmvyD2wYbq49GyXSCkQwtFIid8G5y89obTz52OuWUKah6dOT1rA3onVZIRgwUCfc6BZQLoTCV6uruNgeVJxePSb4bDc14nwWiG7ScSkSW1S9b7veL3tN80z4eBBoX5Y6UtDJs3K3rM0p9OBBxBbCD4sK+eF+kaGLSsEvGNw8S9IhL1Aje633IZeA4Jtv6nWArc2SC/3Vb35rzuR4MX6Jo6G3Cb3V1TxUl39BYI3I8GfG5R85DoR4IhQzudL8n7I2VzwnUFw05iULO/rZuboCDkEb1VW8fOaOg2sVvMKglfbYTWgcHTEpZQe8HyaO50InBJg1gG8a6RUTofdSqKDDZOsEGyvqSclLPpjcfZWVmleVyAFQBLV1kRGtIM60dIyWTr2K943zrwD1/oHekvRqErD2KBZQa9rBc9TFfNy8XqgRlRcneSQ4HQ6L0RdD7gp4UcDMt9SIyIEUGHR64nWMsBrUVAS+KgaILU6EXc63RRQ0gHp3NqUlAgFLQ34kS/qZKApw/pNr1M6+EKhH3wwchRx9X7vLqiSgBReXXA+TSLyOmNfMyaig8EEbup04qJSoHi4m22HlLjbALUYSvzvBLiToojI6wyHy0IREMQZGFPI68Hr0sCH2aK9XQh6Xy2OUUQ4Ot/zYRuGbR2iCQl/167o69IBh90+87dB33SVBH8z9c6gEOFNi6rugdtAuJQI3AzhQuHtzC/UztcAV2HWAQh6X/+qjPqkaN4eFWRhEpbvmuHFddFRYF5HRYUjym1QJ8HdRIuGvOXVNbXMuGKmp89k0vT29HLyxDHDMGfu7I4O4vEE7737DqOj+mutWCzOH8yaRWNTM6MjIxw88B69Pd0A1NU3MO3S6Rz736N0nT3rWXHJtEuZftkMUqkUR48c5sSJ4yWDN9NASwG/GPrGB6MBrpj5ER7d+HiAzd9+cIQv/81n6e7Sjd34+D8DsPHRR9i86Ufe+MbGZjY+8U9Mam3lzOnTNDQ0Ek/E+dY31rHtv7cwp2MuD63fwLcfWc+WF54nmUzy0PoNdF63wIcrJT/d+iLf+vo6crnMuMBD/o+hYMUNDzlH5+t/8Ph3ualzLrfc1Mn3/vFRLp1+GcuWr/DGSilZsnQZo6Mj7N/3FouXLtP6lq9cRVv7FD53319y5+o/ZvWKpbx/6CDXzO8MCWnJvX/9eTqvW8Bzz/yQ25fcwK2LrueZp/6dZbev4PYVK8ddAEF5EPJTAPSC6F8HyXF+p1Ipent7AOjv8195W5bF4luW8cZre/jNvr184Utfpa19CifzIeuuM/8Pr+PEieP09fZw72fWBIx35caFf8TJk8d54rHvYOcPV558YiOvvrKDgwcOKmRFgzfXtYBz6sCoaDC9D/Dpu+9jy7bdvLRjNw89/Aiv7NrJS5s3eePmzL2apuYWdu3cxu5dP8e2cyxRomDTj5/j4IH3WHPX3WzauoN/ffq/uOevPkddXV1+jL9XRUUFdfUNHHn/kAceJLYt+Z933yWXy5YE3rgbDMal5HfARP0u4EwK876zmLPK7pd38vqe3SAEUy+Zxpq7/oIv3v8AG9Y/BEiWLL0N27ZpbmlhwU2L6Dp7lpuXLuPf/uVJpJT09fVy72c+yfTLLmfu1fO4Zn4nn1jzKW5YuJA//9PVGtmpVJpsNsOECUkDnAm2GHit71Qc5EkQM8JToBAR8MGRw+zaud17Rrhq9hxuufU2vv3Nh0mUJbhh4SJGRoZZ/Sd/BkBZWRn1DY1cOWs277y9jytnzaGyqopfvv4ah98/xHPP/JAvfnktK1atZlJrq2ZsNpvh+LFjXDlrFpVV1QydGwQgmUxy/9qvsWXzJn715hvjAQ+IU3EhxB4p5UL/LlCMCF/a26fysWuuxbIE7VOmMuuqORw/9iHZbIZFNy+moqKSdQ98hZ3bfwpAQ2MTP37xZyxeehtv79/Hmk/fzdXz5vOD73+Xd/bvo2piNbM7OhgeHuLM6d9x+YwrlN0kzz79H3zlwXVsfPxJnn36KbLZDHfcuYZZV81h+8+2jhM8SGnvjoO9WUrxoAq6MBG+LF+5iuUrVwEwODDAr9/6FU889g8ALLn1dsZGR3ltzyve+J7uLvbv28uim2/hse9s4Bt/v5a//eqD3PfZzxOLOY8kv/3gMH/3pS+Qzn8/2AUvJWzd8gKxeJy77r6Hr319AwCnTp5k3QP389qrr4wrBQAsi80CEPX1TQeAK3QPK4cdEXpTSv32mklkPJ6gpraWoXODpFIpA4A209PX1dWRs3MMDgwYY0sDL6V9YHBw4KMxgGSy8jTIO4InQGACDoIsEXUBse0coyPD5HLZSNCO0b52bGyUVCoVeu8vDl4ipbgnnR476J2D1dc3vQ7y2vylN7iY9y/GdxZDHv2JAh6uLwxW30sC/GJwsH8BIN3jeWnbsU9ISZe/oPlsoOrN54QL+wmuLQv0q3pTZ9oWCr5HCPkpd6Dmv9raxhuFYDtQVijUC3u9lJAIdXnB8Nf7xxsF3nVaSnHzuXN9eyKtrauru04I6ydSimaIAnvhqRAe9p6hEePC+kK9HHbdY1l8vL+//2W1P9TsmpqaaZYV/0+gszTPn28hKCUSgmPCgYfpvOtfWBaf7O/v/9Bcq5Dlor6+fpWUYj0wM2z4xfrSdrHQ18eMB7g8YFlibX9//0+i9i4JQm1tU4dlyRUgF0jJZKAd73+0uBgsROZDKMAI/RBwwrblKSF41bLY3N/f/5tiO/8fFEml4SlZgqYAAAAASUVORK5CYII=
// @icon64       data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABmJLR0QA/wD/AP+gvaeTAAAgAElEQVR4nO2deZwdVZn3v6fq7n07SSfdnaSTQEMCQcO+IyCKAmFz1NFXEZdxPs5HfEdFHUXHbXAYF1BHcRhlRhRkGXUUdWZkZN9DWGSRJSQkARIwIaGz9Hb7LlV13j/qblV1Ti23b2Pw8z58Otw653nOeeo8v/M8zzmnbl1B9ym1ePHwEVLKE6TkAMMQy0EuRjIHIYpAWiUkFJ9Ulx2RVBcEij0srdogn2wWSn954H8+aakud7uTAFVgEtgtJS9KKdcJIdcKIe/dtm3bw4AVpnZS6sbwsmLFiszo6MSZjsP7hODNQK+3caHtSWn4rmgVQjJ4oQWD1NVHg0AHoTZj+8pVWsh2LI4Bt4K4Zvv2vv+Fp6o6tePStIZ6wYIFA6bIno8hzwMxT9mwUHcRMHwMTbRewkMxZreXNVpO6w1UxtaVS0+13jvEBsYOKeUP0mnz0i1btoyo1I5DHQFgYGCgmE7nvyjgowh6/M2EGT+J4UXnKvpINaye6mjetlk7kyBQewePF/CXT4L4nmE4X922bdukiiuMEo/u0NCStwrE94AlrrRmXmqNH274WEaPdgChpIWD9H5Qpw4aEHQQDpKEgqjwIASbhZAf37Zt238pGLUUGwDDw8O5atW5WMDHW5Iq4wfjfZxZL6KThM5JH+BDZntY/XRAED3jp5EjICXXZDLGeVu2bCmpVPdTrOFdtGjRYimN34I4pGX3JMZPaPhIrabhAhTVSjN3DQSdhoLOAFCnR6W0zhoZGdmiUr2dIod6yZIlS21b3AQsVRm/dZXM+EpXr9RG6xtiUWhKGMjBgkmZpqZe3B0QTNcLaMo2gXnayMiWdSrVGxQ6tkNDwweAvBvkgC6xCy/XGT/K8NMzuo50mbe/QBf7k4IgdiiYES8gkZLtYJ84MjLyjEp1AENXsXjx4kXg/M5rfC9PUuMLfKYV/jZF/b8QEjH+QkV9TEodFIJavVSlcVLZOPseikQ6wcwQgkEwbps7d2iJjkcJgOHh4ZzjiBuAYa8uirivM75inPU3HWJ4pXEjEBABCC0QfPoEb0wHDqUT85W3CuJCRm1stXSQt1EgFhuG9Ztly5ZlVa0pAVCrWZeCOKTZTFLjK1VRD3ak4T0XLaCEO4AQQAS60HuD+CBQmk+PCtX1DHmBusTho6Nj31bVmP6ChQsXvw2MSzxdKwEgFPoHp0OgvK1R7QpAtD40uGZbFosrZSZSKZyIEdADwq9DS5MwgAYaV2huAkXbZr5Vw0ZQNQx8d+9pYya8gJKzNd5HFwrFR0qlSU8+4PEAQ0NDBSHEPwfbVc1+ZX+xQKF1pR7Dt0Tyjs1grcJe5SlS0tF0rCctEAI8MUGgKJW4g7liapIBq9Ya2BnyAkquyL64bP78+T3tBb4QYHwZxHBkl2Fx318WaEyfZCnmIgCD1Sp7laeYZ1UxkW7/YX86tT16CVSd6UEQuGGfoCCFZEmlwpJqhTmW1WLWRIPYXkDdXSe0l2Xx9+0FTQAsWrRoHoi/DfasmP0B5eLEO7csMJBtLlUlkZKSvctT7F2eQkhdu/5u2gGh1lkPUB0IFLq3lQkkhoSc4zBcKbOkWg7RNKEX6FoYACH4xNDQUH/jus0DGJ8CUYxsOgb04g+gorytPgUsrFWYX60w27LISodGZI3z12woBAhJQaBqRQBCQlo6CGBhtcqSaoW843gmSDIvEK80wBU9EXuqVetjjQsD3PN8KflwUC68U73r918kNb5rwrTjsF9pknlWlbR0yDhOrMOe9m6igBAICYpab4n6Zk0pyToOBpK0dBio1di3MkVafYyn0VZ/3cUwAIj/CysyUAfAzp2jZ+E7z1d2LoSvLAS/SUHRqKv3kZaSObbF4vIURdvGkJKMlJhStgUM/bwPNNt+pdvNVII5zv0IUlKSr3sAA5htWywtl8m2ewF/X4HGVB2ElMX0Cgrq7+8fWUldV4QQ7w02GbNxz8BEzJiwUtEykwDyts38aoU5Vo2047r+lHTISaeeCKL50wPCU6IFgf+eVOXBe0pLSd526nkKFG2HJdUyRdvGbJ7ZBsS0xZ2HAY1ksPi94AIgBbwpWqNwF6WuUvnb8I2URl2vbbGk7HWhhoQ+q0auPqu0899ToAaC6p50Xk0NbO9FTkrm2jUXnIBAknUkS2oVio4dkFdT8jCgbCVGKAN5CmAaixYtOhLErLgqecoiZ7//It4umgH02jZDlXJr9uDG2b5ajWzIgGrBkBQEukHUgDvrOMytWRhSNmtTUrJXpUKvbXtkuhkGOs8DmNPf33+YAcbxnvYVg5Uo1oS4SR2vnzPrOMyya8y2as0BBTCR9Ncq5BwHfQzwNu9Vp3MQhNnDAArSZp5V82ytppAsqFXose3IYencjp1KCsA80ZCS1yTpQz04Hc5+zbD22hazLKue8LXIlJL5FXdAtceYCjDEA4G2wSC3TyjtOPTaNnNsywNYQ0pmWxZFxyYVezWg0C1GaXIeAHmAASyfbjNBgYipA0rX3wBW0bbotYKPvxtSMseq0VerknesGE6gVeCNBNH+Na4XABioVRmoVj3Gb+qMe0bQygM0YSD2deekyA2WGyAWhysU0WisMvU+gMr4AL2WRY8dBICg7gWqFQarFb39lUBo+yQUZdBRQDUQLKxVWVCrBrptXPc6NkXb9laobi4GxdUw3q3IvQyglQAqFfMPlNAObnxSZTOt/+Udm7ytT/TmV8oMlcv11UBw+ntnu6ZPHQgCEpr7Fa5H6rNqLKhW6bNqWn0LtkMhxkogOEHjMMU1tpKp1wCKccTjt+/3mTFnf1tZxnHIhpz6za1VWVSeor9aIeW0todbbbW1p+g8dLxiHjUbSHLSYd9yifk1d9tXRxnpkHWS5wCvAPUaQEZV02nkiZZTxDhfUUriWf6paKBW4ZCx3cy2auRti6xj+2KwDgT4ypMFv5SU5G2bWZbNQK3GgZMTzK2Ff10vVd/B7ITi2aHjPCGb6lRyOt2GezaBETFgAsjZNnuVS2R3OdhC4CCwhPsgxngqze5Uml3pDLvSaSwhkIL6OULzQ6iChnQ9UX+typxalTm2RdGymsY0kaQdh3lWLfIZBRN3Sei9A9mmiV+nGDp2iaYFgFBSufqYiDHqR6thlJKSXsui15poljlAzQeA7Zksu9JpxtJpxs1UcFwFtKEDQ0pmWRZza25cH6xW6LNq7nLODi5NY92PjL6fcJopgAg/AGIsSUIDetIljVBFgPp18hs0cDeRstUK/dUKUghKhsmmfIFnCz1syhcoCxNbCKRnBoKoHzb12BbLpiZZWppkqFIm1YHBVaRM8PaAtCAF8SZmNwYhbi+WEFjCIC3j7qFrSEoKjs2y0gQLKmWWliZ4uLePkUyWiuG9o6Jts1d5ikMmRumr1ch1uHmjIvd+YjB2FRTxGgsPAQmt3i0gVQ2DqmGQj32IEtJXfWbPljUyjkPGkTyb72FzLs9IJoOQkqFKmX2mJtlnqkR/rdo8fewWVQ2DstHNFrtHM5cDTIMqhkmlywNm1t37PlOT5BybrGOTdfJkHYd9piYZrht/JmhKGFTE/wdALBKALQT2NI65wtoWUrKoPEWPbTFQrTDLqjHXqoVuPE2XnBm6n27QHgUAAaQch3nVKnNq+p21btAsy6JgT9Yz9JnNxgZrVQZraZ7N5ma0n05oj/JLKemwuDJFX60auhPYDTKkJOM4pKSc8UGYY1sM1mrMtq09a8D5EwAgbK6ZUrJXuRR4DuDVTlnHoc+2mF+rdbwjOFMUDgCp/BiHvSNKO5KFlbLyJPDVTj22zaJqJXxp+SfAhuHtN4YGXVWy9a14Q0qyjs0syyIdcrDyaqV8fdv4lfNs8fqJCAH+RjTXUlGveqmC6ubrRan6pk1KOq/QptMrS2npPjXUHPA9JBLsMTmJgWx+8ePPEQApICfdL440SO95k153SiEJ8EzGfN2rUwTd2XffI8lzIBR/5GbaUXTdAyjeauO7VIcBKdzj3D9XcoSgKsQMGbTzVr0AUL9/KPhRKhi0eUBks4DERlA2TByxx4THrpIlBFOGscf5OCP4fqpk8acjYym8gC0EZcOog2DPGqRuUFUIxswUju7WAm8VI87McYtiGUHNNCNJYNBBqF+x1l7mIKkKg9FUuv56lT8vKhsGI6k0NkzLxcUVjbvaDB3p0DbihgGtvN/zgCVgWybLpBF4ddGrniYNk5cymWaeM7MrADWPChRBACinql/d6DAQywv4QGAJgxdyeSZSqelMkj2OKsJgl5liezqdKLy9EmNgtHeVaEdQR6FeQPk2/Oa/thBsT2cYSWcomX8+XmBHKsW2dIYJw0T5dLgq/sem6S3GI4OtfnZ7tVabNsZhgmxVOsCUabIlm2N7JosMEXs1UAPUL2azvJjJkmiixUz2pruzrAZARBjQU3DdFy8UtNqXwOZsnk25ArU99CmauOQIwU4zxQuZHC+nlT+V5KPwUBt3OqjeG6yjtp1JPTrjewGlOorL8BcvT5omL2ZzPNPTQ+1VuiJwgJJh8IeeIlvTafeh0K67fxXFTwAh6TKwYy+QDASOgB3pDGsLvWxLZ7v+fOBMk8QF8aZsjvXZPGNmylPn/6RsIE7ZNKEjJfXtabV9mLYXiAkClccqGQabc3nW9/SwM53ZY5+pU1FVCLakszxaKLIrlXKXfpG26mCl1bH9W4KpYEXEQEup/gJlm6j7pQuhKPe1LsF9q5JQ9lwVgsd7ekk5DinHYWCGntrtNm3K5niyUOCFTLa+7teE10TuP573TRL/of2BkCReIDDj464A9D/GoPIGEpgyTNYVijzZ08vLe7gnqArBhlyeNfkeNmdyLeMnmP0z4f7DPIXiqeAYXsDH05zD0vs9L7UnkPWPHkaXRANO3q9x70hnoOBmrK+dnGCOZZGe4YdGk1LJMNiWzvBkvofnsznGffsYcWe/2v0rJtg03X9DPtVmvoDZWx66VduyozcU6ECgiwEecARYvUAA3M2h4mzSUrJsqsTcWrVrX93qlBq9V4XBS+ksjxd6WJvPU20uX7sw+xNok9T9g/Y4WBsPQtlU/bacu6pOtyfgl3b5pkyTB3vn8ERPL9szyh/AeMXJwXX7vy8WWZfPK/cupjX7FYzq3w1SUxRrqtW1aM/JvGX65lGGAkQgkugSQ2VIaPA0qK6PA5RMg/WFAmXDYMI0GS5PkXZe+ecIbQRTpsHafIH12TxbMxnf179kDAcQZ/Z308t53T94cgC9qTsKBXFAAJ6Q4F5qVhhttNNMU80JKobb08JKheIr+KWLmhDsTqV4PpvjyXwPL6fSvi9/qizfndmvk+7E/YMiCVR5AU3lNEAAKL1Be7gI//WwCTPFhlwPk4bJYWKc4XKJvO0+dDlT3kDi7u2PplKsyxV4uKfIhJlC963CcNff2exPkvbE4U353bEmFSQUE43elCBAsTpw/9V5g0ZhS38RrMZ9zGprJke112BXKsWhE+MUbLv5vt5uky0EL6fSPFrsZUM2z4RpKowfx/UHJPBLdH/2B90/SFJakysqFHPfe6UEQf2T9L9NROMNGhRYSahvqyZgRzrNWtFDyTBYUZqkv1atv062ezRhmmzJZHky38OLmSwTpkmwh7iuf8+Y/dAIAQovoAsFqnzAw6EAAbT5EIUHwQ+EdkFfsYpqQjCSTjNZf55w6VSJhdUqvdP8ipms/+1MpXkhm2VjrsDGbLa5zJN+7patvTcRYvzpzf7pgMK9SDVTswQgaLHEA4G3RTTeoPVvKBg05CCYNEwe7ZnFhJGiJibYtzxFxuksL2jE+0nDZG2hwNP5Hl5KpTXqhBg/0Kr/SipY4s7+6D70ZS41l4HBbZk24/pA4L1MBgLweQMIzPBQMESQBJ7L5Rk3TXak0xw+MUah/W3dMcmqZ/qri7PZnM0xZqhmfb0kYHxldVBRZXF8A+pmfxKv4F0FhMZ9b0lsEEC4NwgBQoPXPwBhxpRAVcBIOoUlCtSEYHlpkvm1auzf7ykZJi9msqwpFNiczTEhjPqbxRS9KY3fTdffndmvcv/g2weIFwp85c1LDQgavYd6A/dTGBDU6uupKgxG0mkqwsBCUCuXGKpWQl8A5QjBuGHyQjbLM7kCG7I5qobRzAUCWnTR+HrXrzZqN2a/lIrj4E5AQLPOa0HPVYg3aHxqNe1DQIcLewfBqJniiUKRScPElJLBWrWeF/h4hWDSMHgul+OxQi9/zGRw0IGtQ+OjMT7JXL+aks9+0JwGJgVB85MXDYEuW0DwHxj5VfMlbX5AJCJJxRA8m8sxbhocPz7KULUaeHv3qJnimVyeh3uKjJopjfGl6n+BOq3xE85anevv1uwHdO8rCH98Gw2ipOeDdvjcT1KqWDy8rT8ZKIn7J3GfzyvXj2sfKM5ifS7PaNtjWtvSGZ7KF3i80MNuM0UtLN63/ufTtFXnv1vF4LSKE7l+Hek3g8JmPzSWgVL1+/Oq0B3TEzQ/eENCuwqtDaJGQfgsTzIcOvmKYfB8NoeBu8Tbu1KmYgjW5wpsyObZmla9OD3GrK9/DDO+0vVrjK+/2873/D0SbSKt00DNOX4kCEC5WQT+kNBk9PKotJrBp34cBBuzOWqAkJKX02k25PKMpFSPbUuN4X0lnRgfXdzvhuuPN/tBIubPH2rWCGVsrq/EdeXey8CFulhtYL3Z1TlDLIoMRxohr33V0gFwJDC+xpp615/czavKA2cBvi4QHXgCCA8J0OYkmszgt6r//jz+YroxQNG+kiOO4ZUq7QnGb28rRLe2MsVxsOJRrWZn9RrhLdeHhBZzEiCEqa3nDpeJlIhr+PplmPFbgx/f+Mnivr8fbxtJVgnKV8VKKTXhQLVEbHQc5g0gFAjIyPDg7216pA7smnkZIhYGjGTGTxb3k4yAfvYDpKSUCEXSpQ4HzRoNCEDtDbz1frX0YPBwTIP001s/lGGGVzekc/nQfeNPLx9okeeZQIUKoSBo2irKG3h4gm5fD4Y2jk4woHOFcQXiGL5e1F3jh1O38oHmVrCb4OlBgHKfoHHL0d4AwoDgKVQOoRoU8SladLqGD6vvxPhJvYKaNw41c4AwELgdqzeLor2BWxgAgodXDQZVbXco3DVEGr5eHD7rQ2Q7NL5WkWZ/Qd6ocu8ysK60KidoKKarq0sqHyVTAQF0iwCtD5gGhUBImx5EGV7PM1PG7/5SMGwVoNmN068Q3E703qBdCV8i6A/xWrkuUGQS2LnhISzeu3Izb/wYAa9t4LW/GBIKAm1e0KZYLCC0Kv1gVTadxBEkSgDDPUQ8w0fVdwKMpEaO7/obZc3vBiqbk7Ju5JCQEOIN3H/DgOBVziUFINpY42Agnr+I4Ipp+PBEr87SVeO3txvkDytXUaqV/IEyAQtNDhveQJcbtBRoAKHZi9aS4TlAZ8EgplQgCYwybBRPVNbeifGjgeHnbV7JYHmqvUK7FAxNDhs8rqyepX1Y27wCyi61sl2nhEaHOIaPmvWufPeMr5v9KMq9DIFVQOhsDw0JbuNuR2FAaCnh/uvzDGHNd4MCBg9eaUVjGN7lC/cKrba6UZck7gcpeBgUCQK38TBvEB8IPkVxZdrHuKNdYRl6GVqq5OyK4d02wlYBrb7i1iWN+8GQoFkGhucFLk+UN3A7bIaX2Gf6qrkpdNWJ20si1u6nopijY/Kfxvg619+2ERQW9+N6A7Q8re4lhx1+JAe89sDQJHCqNMWm55/lycf/QK3545HRRviLt72TQrHQvH7gvlU8u3FDpBzAwMAgJ5z0Rpbtv5x58wYwTYNdu3YyumsXGzes556772BifDwgd8JJb2DJXnsDsHPHDm684X8Urbu6L9v/AI4+5nXsu2wZs2bNxjQNdu7cycb167jv3rt4/rnntbLdNn47v+jvny9FRPCNqvfy6XnO++gnePe57w9to0ET4+Ncc9WP+MXPro10rYuX7M01P/+Vp+zWm3/HVy/8YqicYRh86MMf5Z3nnEsqpf8R1VJpku9+8xvcfOMNzTIpJV/52jd5w8lvBmDt02v48AfP9UlKhoaW8JnPf5HDjzxG276UkrvuuI1vff0iRkd3N2XdugB3m1zcOhUw3DLDy6yJljJu5tuIg9PP2ou9vXzkY5/gA3/9N5G8p55+RqDsxNe/kUKhR6FkS88P/s15nPO+DzSNPzE+zuOPPcIDq1fxwuZNTZFCoYfPfvFCDjzoYKSUsWI9SJbut5x/u/LaUOODu4R+w8lv5vtXXM3sObOJY3x1nyjkdF7BJd9hUENA7/KjcoNWJ/XorckCx0ZHec873+Ip6+kpctDBh/LxT13ArNmzAXjHu8/lmqt+jGVZwV6F2/4pp7UA8ND9qznq2OPI5nKccNIbuel/VW4Zstksf/l/zmle33bLjVz8TxdSrbbeRXjMccfzla9eQi6fxzRNznnfB3niM5/Q3ne74XL5PBd941vN+wC44b9/zfX/+VOee3YjhmGwdNl+vOPd53LqyjMB2GvvvTn/7z7HP37pc5HG7zTp85cbfoaW8eJ4g3iZscorSCQT4+Oev20vbeXWm3/HdVf/uMnX01Okr6+v2Z/nPyk58OBDWbBwCICNG9Zz/S9+2pQ97fQztXotGFpEPt/KGX79i597jA+S+++7l6uv/CEP3n8fv/7lz1m96p6Ie20N8hln/QWLFi1p1v3wB5dx8VcvZMP6dViWRbVa5ek1T3HRlz/PFZf/a5PvDSefSt/cfn/LgX6i6+KVh6wCGsxhCWA8j9DijxcapqZKzc+2bbFr104tb7uR77j1Zh75/YNMTk7Q01Pk0MOPZGBgkJdf3h6QK01Oeq6X7b+cJ594LDDzrrv6Sq67+spYeuv02rxpE9dd/SPtKuDan/yIfD7PU089ziMPPcTERHvCGS/me+vjeQRo/mhUsMLbmN5wST2CVzboHRYOLeJt73hX8/rWm25sun8/ZbNZTjr5lOb1HbfeRLVaZdXddwJukvem005Xyu4YeZkdIyPN6/P/7rNc8Pl/4HUnvJ6enmIc7bU1mUyGZfu/pnl95+03Y9u6N5ZIbNvi8n/9LnffcfuMGF83+Rr7AFUgo5rtrVne3kB3PEKx2MtPr/fG52w2S9/ceRj17+Lfe9cdfO+fL9G28boTT6JYdI21bu0a/vjHFwG4/dabOfX0swB3Jv7s2p809W/oads2l136Lb70la9hGAZCCM44+62ccfZbsW2LtWvW8NAD9/HgA6tZu+YpbNsOtKGjufP6SadbznXjhvUKrjDjRtV3x/ggKykpmRCCud4GooAQlQBGA8E0TYYWLda2s3rVPfz2v39DqTSpzbobyRPAbTff1OR76IHVjI+N0TtrFvvsu4xl+y9n/bq1Afnbb7kJq2Zx3sfO98Rr00yx4qCDWXHQwfzVh85j166dXHXF5fzm+l/EWgE0QNmgyYnJAE/zU6JkL6w+zItraTwFjEnpAqCVsKuNnGSWtyumWgjUajXurbvqBuVyOQYG57N02X4cd/yJHHf8ifzh0Uf4hy9cwK6dOzy8fX1zOfrY4+p9SW6/9aZmnWVZ3HPX7Zxx9lsBOHXlGUoAANx9522suudOVhx0MEcceTRHHH0sr3ntClJtXxXr65vLJz/zeeb1D3LF5Zdp77lhhKmpsqc0k8146l2d9fJqnqgwnbROAoynhOBFKRluVHhBAPoj4nAetTItKpUmufALFyj5995nX7596Q8YGBzkkMMO59Of/QJf+OynPDxvOnUlZv0bvrZt8dVLvuOpd1cOdd5TVnL5ZZfW3XiQbNvm8cce4fHHHuHKKy4nlytwyGGHcdzxr+fMt7yNTMY14Hve9wF+9YufsXPHiLKdxn3u3r2L9gdqFi5cxB5ofIDNBsi1foY4a8wGnzcBTJ4EqmQ3Pfcsv/plazl31DHHYfrevn3a6Wc3P6dSaZYf8BrP3+D8Bc36ef0DHHn0sf7ePX/t9zM1VeL++1bxnW9+nS9+9pOefg486JA2eTVNjI/xwubNbfofU79fnUuXnP3Wv+SQQw8HROQyr0vGB1ibchz5tGoLt7MEMJpXr7Ar2/BAVq2V+WdzOYrF3uY26fA+S9n/gAOa9RvWP6Oc3YODg/TNnQfAKSvP4IHV9zb7PO2Ms1m6bBnD+yzl4Yce4Of/cY1Sv98/+CC2bTcBmMvliAP01avuYq+93W3vo455HcsPWMHap5/y3z0Ay/bbn09/7kuYpsmLL77AP3358zzx+GOBfqbvFbzlQsi1KSHMVXjehxEEQpyw0K6AFwh6fl0bxd5ezjz7bc2ysdExxsZGmwlY+xp765Y/8qH3v6tZ1z5Ibzp1Jf9w0TcAeP1JJ5PP91AquQnZm09dyTHHHQ/Aa1cczIP3r+a5Z4OHRyeedJLH+7zwwqaI5Mqt/OXPr+Pt7zyHdDqNaZp87Zvf4XOfPp9n1j5N+9gs229/Lvnu95t99BZn1fWYWeO75fKe1I4d2x6eN29gDJjVaiDMG7Q3Fg6ElkyjoFWRy+U572/P98hlslkGBgc54qhjKBZ7m+W//a/rcepv/jQMgze3Z/+33Iij/DVGWHXPXUxNlcjnC2RzOV7/xpObJ3bXXHUFRx1zHIZhMGv2LP7tx9dw5+238sy6pxkfH2fW7FkceNChnPD6Nzbbe3bjBtau8c/i9jFp6bF1y1Yu++63+ORn/h6AwfkLuOInP+XRhx9i/TNrMYTB8L5LOfLoY5vLXikl3/z6hb69gJkxPrB7dHT0sRRgScmtwNujDJwUCEHlW5TNZnnP+z+olWvQ3Xfexo9/+IPm9aGHH8Xg4GDz+rabb1KJAVCemuLeu+9snhWsPOOsJgAef+xRLv32xXz8Uxdgmia5fJ6VZ57NyjPPVra1c8cIF37hgiYQddR+v9f/509JpzN85GOfwDRNDMPgiKOO4YijgodD1WqNb198EXfcdouyrbBcrMO6mwE7BSCEuFZK+Xavu28XjguEIIAB4y0AAAQRSURBVK9KLozKU1Ps2DnCmief4Obf3cADq1d56k8/86zm5+ef28jGDc+EtnfbzTc2AeCCZ4Dt292t4V//8mesXfME7zr3rzj2dccrTw9f2rqV22+5if+45srAUW24m3bpZ9ddxf2r7+Hc9/01x51wInPm9HnqJycnuPuO27jmqivY9PxzmraSzfpWfWgCfy20rJWZO3dgCzCvwaQ+xNMbNyl/sna6T35jGYbB/AULmT17NtlcjqmpEtte2sro7tF2qch2wnhBMH/BAvr65mGmTHbv2s2WP24OeJWZNj7Il8fGdi/Cfde2S3PnzrsIjMATFN0BQrhMEooDkDieJj4lMXoS/ii+MANG1UfWfWVsbPeF0GaV3t7eeel09nmgqDJWJzN8psEwMxQ18NOVi8M3o8aflNIeHh8fHwForm+q1epULtfTKwQntsTiAkHNG08unvzMkd6y8TzJ9MJCNwzf4okFjIvHx8eaz7Z5Rn1oaKhQLleeAjHsbaJ7QIiW76y9cIoXE+KHjqReIg5Iuj/r3XpP3eZ8Pvvabdu2NU+nPPur4+PjtWy28LwQ4t3q5pIAQc0fyv0KO4FkuUInnqIb7j6KJ7bxAXHuzp0jno0M08dBuTy1LpcrLBCCI7UtRz49HF8mCSUFyPSTwe4ZXS0zMy7frQ/U/cvY2O7v+QuVQzo8PJwbHZ24DzisU6PuuTE/jMIRkzT718vNXCLo8gTqfj82tvsEoOKv0Fqhv79/yLblqvZ8YObAEK+d7lK38oLpG97LO51Zr6x/zrJSx5dKI1tVMqGj3d/fv9xxuFtKBtvLpzu7uxfr2xvqzuK/08w/vI3pGb7Fl9j426W0TxwfH9dul0aaYvbs+fsahnUTsMzPHs+Q3V4VdI+6lQTq24rrHTqf9S6Psv55Ke2V4+Pj68JkYw17PRz8D3C4TqybYFBKdijaeSIYLZjU6EGZ6c16l0dZ/3vLSr1F5/bbKbAKUFGpVBovlxf9pFAozwLajrI6WQ0EuJMwzxAlQ8meYXg1j5Ti38fHd7+zVivtDlQqKPHo9/X1nw3yX4C94zQ1PdfebXB05g46WfKpZeOCpKNZ/xyIj42N7bpBVamjWB6gncrl0jNz5/b9u2XZ4IYExc9sdGtF8KehTpd7+ja6ZXglzzhwydhY8ZxKZfuaWMq10bTMUT9AOl9KPgLS/4W22N38KUHRjaxf31ZcDxGHL8DzMvB9cL43Njam/+5cBHVr6DNz5vSvFIL3gjwFmNOtbrsBjm5m+9HtJwFLYoDsAnGLlFw7Pr7rRqCmFYxJMzH3zHnz5h0upTxBSg4AsRzkEhBzgCLKkDFTqkRR53sHncz2llwobxWYkJLdUsrNIJ4RQj4thLx3dHT0UVD8Yv006P8B9LyWZ2Knrc4AAAAASUVORK5CYII=
// @match        *://fetlife.com/*
// @match        *://*.fetlife.com/*
// @run-at       document-idle
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// @connect      github.com
// @updateURL    https://github.com/Typical-Bits/fl-tools-basic/raw/refs/heads/main/FL-Tools-Basic.user.js
// @downloadURL  https://github.com/Typical-Bits/fl-tools-basic/raw/refs/heads/main/FL-Tools-Basic.user.js
// ==/UserScript==
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // ../fl-tools-core/node_modules/semver/internal/constants.js
  var require_constants = __commonJS({
    "../fl-tools-core/node_modules/semver/internal/constants.js"(exports, module) {
      "use strict";
      var SEMVER_SPEC_VERSION = "2.0.0";
      var MAX_LENGTH = 256;
      var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
      9007199254740991;
      var MAX_SAFE_COMPONENT_LENGTH = 16;
      var MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
      var RELEASE_TYPES = [
        "major",
        "premajor",
        "minor",
        "preminor",
        "patch",
        "prepatch",
        "prerelease"
      ];
      module.exports = {
        MAX_LENGTH,
        MAX_SAFE_COMPONENT_LENGTH,
        MAX_SAFE_BUILD_LENGTH,
        MAX_SAFE_INTEGER,
        RELEASE_TYPES,
        SEMVER_SPEC_VERSION,
        FLAG_INCLUDE_PRERELEASE: 1,
        FLAG_LOOSE: 2
      };
    }
  });

  // ../fl-tools-core/node_modules/semver/internal/debug.js
  var require_debug = __commonJS({
    "../fl-tools-core/node_modules/semver/internal/debug.js"(exports, module) {
      "use strict";
      var debug = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
      };
      module.exports = debug;
    }
  });

  // ../fl-tools-core/node_modules/semver/internal/re.js
  var require_re = __commonJS({
    "../fl-tools-core/node_modules/semver/internal/re.js"(exports, module) {
      "use strict";
      var {
        MAX_SAFE_COMPONENT_LENGTH,
        MAX_SAFE_BUILD_LENGTH,
        MAX_LENGTH
      } = require_constants();
      var debug = require_debug();
      exports = module.exports = {};
      var re = exports.re = [];
      var safeRe = exports.safeRe = [];
      var src = exports.src = [];
      var safeSrc = exports.safeSrc = [];
      var t = exports.t = {};
      var R = 0;
      var LETTERDASHNUMBER = "[a-zA-Z0-9-]";
      var safeRegexReplacements = [
        ["\\s", 1],
        ["\\d", MAX_LENGTH],
        [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH]
      ];
      var makeSafeRegex = (value) => {
        for (const [token, max] of safeRegexReplacements) {
          value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
        }
        return value;
      };
      var createToken = (name, value, isGlobal) => {
        const safe = makeSafeRegex(value);
        const index = R++;
        debug(name, index, value);
        t[name] = index;
        src[index] = value;
        safeSrc[index] = safe;
        re[index] = new RegExp(value, isGlobal ? "g" : void 0);
        safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
      };
      createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
      createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
      createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
      createToken("MAINVERSION", `(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})`);
      createToken("MAINVERSIONLOOSE", `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})`);
      createToken("PRERELEASEIDENTIFIER", `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIER]})`);
      createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIERLOOSE]})`);
      createToken("PRERELEASE", `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
      createToken("PRERELEASELOOSE", `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
      createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
      createToken("BUILD", `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
      createToken("FULLPLAIN", `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
      createToken("FULL", `^${src[t.FULLPLAIN]}$`);
      createToken("LOOSEPLAIN", `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
      createToken("LOOSE", `^${src[t.LOOSEPLAIN]}$`);
      createToken("GTLT", "((?:<|>)?=?)");
      createToken("XRANGEIDENTIFIERLOOSE", `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
      createToken("XRANGEIDENTIFIER", `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
      createToken("XRANGEPLAIN", `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?)?)?`);
      createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?)?)?`);
      createToken("XRANGE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
      createToken("XRANGELOOSE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
      createToken("COERCEPLAIN", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
      createToken("COERCE", `${src[t.COERCEPLAIN]}(?:$|[^\\d])`);
      createToken("COERCEFULL", src[t.COERCEPLAIN] + `(?:${src[t.PRERELEASE]})?(?:${src[t.BUILD]})?(?:$|[^\\d])`);
      createToken("COERCERTL", src[t.COERCE], true);
      createToken("COERCERTLFULL", src[t.COERCEFULL], true);
      createToken("LONETILDE", "(?:~>?)");
      createToken("TILDETRIM", `(\\s*)${src[t.LONETILDE]}\\s+`, true);
      exports.tildeTrimReplace = "$1~";
      createToken("TILDE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
      createToken("TILDELOOSE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
      createToken("LONECARET", "(?:\\^)");
      createToken("CARETTRIM", `(\\s*)${src[t.LONECARET]}\\s+`, true);
      exports.caretTrimReplace = "$1^";
      createToken("CARET", `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
      createToken("CARETLOOSE", `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
      createToken("COMPARATORLOOSE", `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
      createToken("COMPARATOR", `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
      createToken("COMPARATORTRIM", `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
      exports.comparatorTrimReplace = "$1$2$3";
      createToken("HYPHENRANGE", `^\\s*(${src[t.XRANGEPLAIN]})\\s+-\\s+(${src[t.XRANGEPLAIN]})\\s*$`);
      createToken("HYPHENRANGELOOSE", `^\\s*(${src[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t.XRANGEPLAINLOOSE]})\\s*$`);
      createToken("STAR", "(<|>)?=?\\s*\\*");
      createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
      createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
    }
  });

  // ../fl-tools-core/node_modules/semver/internal/parse-options.js
  var require_parse_options = __commonJS({
    "../fl-tools-core/node_modules/semver/internal/parse-options.js"(exports, module) {
      "use strict";
      var looseOption = Object.freeze({ loose: true });
      var emptyOpts = Object.freeze({});
      var parseOptions = (options) => {
        if (!options) {
          return emptyOpts;
        }
        if (typeof options !== "object") {
          return looseOption;
        }
        return options;
      };
      module.exports = parseOptions;
    }
  });

  // ../fl-tools-core/node_modules/semver/internal/identifiers.js
  var require_identifiers = __commonJS({
    "../fl-tools-core/node_modules/semver/internal/identifiers.js"(exports, module) {
      "use strict";
      var numeric = /^[0-9]+$/;
      var compareIdentifiers = (a, b) => {
        if (typeof a === "number" && typeof b === "number") {
          return a === b ? 0 : a < b ? -1 : 1;
        }
        const anum = numeric.test(a);
        const bnum = numeric.test(b);
        if (anum && bnum) {
          a = +a;
          b = +b;
        }
        return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
      };
      var rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);
      module.exports = {
        compareIdentifiers,
        rcompareIdentifiers
      };
    }
  });

  // ../fl-tools-core/node_modules/semver/classes/semver.js
  var require_semver = __commonJS({
    "../fl-tools-core/node_modules/semver/classes/semver.js"(exports, module) {
      "use strict";
      var debug = require_debug();
      var { MAX_LENGTH, MAX_SAFE_INTEGER } = require_constants();
      var { safeRe: re, t } = require_re();
      var parseOptions = require_parse_options();
      var { compareIdentifiers } = require_identifiers();
      var isPrereleaseIdentifier = (prerelease, identifier) => {
        const identifiers = identifier.split(".");
        if (identifiers.length > prerelease.length) {
          return false;
        }
        for (let i = 0; i < identifiers.length; i++) {
          if (compareIdentifiers(prerelease[i], identifiers[i]) !== 0) {
            return false;
          }
        }
        return true;
      };
      var SemVer = class _SemVer {
        constructor(version, options) {
          options = parseOptions(options);
          if (version instanceof _SemVer) {
            if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
              return version;
            } else {
              version = version.version;
            }
          } else if (typeof version !== "string") {
            throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`);
          }
          if (version.length > MAX_LENGTH) {
            throw new TypeError(
              `version is longer than ${MAX_LENGTH} characters`
            );
          }
          debug("SemVer", version, options);
          this.options = options;
          this.loose = !!options.loose;
          this.includePrerelease = !!options.includePrerelease;
          const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
          if (!m) {
            throw new TypeError(`Invalid Version: ${version}`);
          }
          this.raw = version;
          this.major = +m[1];
          this.minor = +m[2];
          this.patch = +m[3];
          if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
            throw new TypeError("Invalid major version");
          }
          if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
            throw new TypeError("Invalid minor version");
          }
          if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
            throw new TypeError("Invalid patch version");
          }
          if (!m[4]) {
            this.prerelease = [];
          } else {
            this.prerelease = m[4].split(".").map((id) => {
              if (/^[0-9]+$/.test(id)) {
                const num = +id;
                if (num >= 0 && num < MAX_SAFE_INTEGER) {
                  return num;
                }
              }
              return id;
            });
          }
          this.build = m[5] ? m[5].split(".") : [];
          this.format();
        }
        format() {
          this.version = `${this.major}.${this.minor}.${this.patch}`;
          if (this.prerelease.length) {
            this.version += `-${this.prerelease.join(".")}`;
          }
          return this.version;
        }
        toString() {
          return this.version;
        }
        compare(other) {
          debug("SemVer.compare", this.version, this.options, other);
          if (!(other instanceof _SemVer)) {
            if (typeof other === "string" && other === this.version) {
              return 0;
            }
            other = new _SemVer(other, this.options);
          }
          if (other.version === this.version) {
            return 0;
          }
          return this.compareMain(other) || this.comparePre(other);
        }
        compareMain(other) {
          if (!(other instanceof _SemVer)) {
            other = new _SemVer(other, this.options);
          }
          if (this.major < other.major) {
            return -1;
          }
          if (this.major > other.major) {
            return 1;
          }
          if (this.minor < other.minor) {
            return -1;
          }
          if (this.minor > other.minor) {
            return 1;
          }
          if (this.patch < other.patch) {
            return -1;
          }
          if (this.patch > other.patch) {
            return 1;
          }
          return 0;
        }
        comparePre(other) {
          if (!(other instanceof _SemVer)) {
            other = new _SemVer(other, this.options);
          }
          if (this.prerelease.length && !other.prerelease.length) {
            return -1;
          } else if (!this.prerelease.length && other.prerelease.length) {
            return 1;
          } else if (!this.prerelease.length && !other.prerelease.length) {
            return 0;
          }
          let i = 0;
          do {
            const a = this.prerelease[i];
            const b = other.prerelease[i];
            debug("prerelease compare", i, a, b);
            if (a === void 0 && b === void 0) {
              return 0;
            } else if (b === void 0) {
              return 1;
            } else if (a === void 0) {
              return -1;
            } else if (a === b) {
              continue;
            } else {
              return compareIdentifiers(a, b);
            }
          } while (++i);
        }
        compareBuild(other) {
          if (!(other instanceof _SemVer)) {
            other = new _SemVer(other, this.options);
          }
          let i = 0;
          do {
            const a = this.build[i];
            const b = other.build[i];
            debug("build compare", i, a, b);
            if (a === void 0 && b === void 0) {
              return 0;
            } else if (b === void 0) {
              return 1;
            } else if (a === void 0) {
              return -1;
            } else if (a === b) {
              continue;
            } else {
              return compareIdentifiers(a, b);
            }
          } while (++i);
        }
        // preminor will bump the version up to the next minor release, and immediately
        // down to pre-release. premajor and prepatch work the same way.
        inc(release, identifier, identifierBase) {
          if (release.startsWith("pre")) {
            if (!identifier && identifierBase === false) {
              throw new Error("invalid increment argument: identifier is empty");
            }
            if (identifier) {
              const match = `-${identifier}`.match(this.options.loose ? re[t.PRERELEASELOOSE] : re[t.PRERELEASE]);
              if (!match || match[1] !== identifier) {
                throw new Error(`invalid identifier: ${identifier}`);
              }
            }
          }
          switch (release) {
            case "premajor":
              this.prerelease.length = 0;
              this.patch = 0;
              this.minor = 0;
              this.major++;
              this.inc("pre", identifier, identifierBase);
              break;
            case "preminor":
              this.prerelease.length = 0;
              this.patch = 0;
              this.minor++;
              this.inc("pre", identifier, identifierBase);
              break;
            case "prepatch":
              this.prerelease.length = 0;
              this.inc("patch", identifier, identifierBase);
              this.inc("pre", identifier, identifierBase);
              break;
            // If the input is a non-prerelease version, this acts the same as
            // prepatch.
            case "prerelease":
              if (this.prerelease.length === 0) {
                this.inc("patch", identifier, identifierBase);
              }
              this.inc("pre", identifier, identifierBase);
              break;
            case "release":
              if (this.prerelease.length === 0) {
                throw new Error(`version ${this.raw} is not a prerelease`);
              }
              this.prerelease.length = 0;
              break;
            case "major":
              if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
                this.major++;
              }
              this.minor = 0;
              this.patch = 0;
              this.prerelease = [];
              break;
            case "minor":
              if (this.patch !== 0 || this.prerelease.length === 0) {
                this.minor++;
              }
              this.patch = 0;
              this.prerelease = [];
              break;
            case "patch":
              if (this.prerelease.length === 0) {
                this.patch++;
              }
              this.prerelease = [];
              break;
            // This probably shouldn't be used publicly.
            // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
            case "pre": {
              const base = Number(identifierBase) ? 1 : 0;
              if (this.prerelease.length === 0) {
                this.prerelease = [base];
              } else {
                let i = this.prerelease.length;
                while (--i >= 0) {
                  if (typeof this.prerelease[i] === "number") {
                    this.prerelease[i]++;
                    i = -2;
                  }
                }
                if (i === -1) {
                  if (identifier === this.prerelease.join(".") && identifierBase === false) {
                    throw new Error("invalid increment argument: identifier already exists");
                  }
                  this.prerelease.push(base);
                }
              }
              if (identifier) {
                let prerelease = [identifier, base];
                if (identifierBase === false) {
                  prerelease = [identifier];
                }
                if (isPrereleaseIdentifier(this.prerelease, identifier)) {
                  const prereleaseBase = this.prerelease[identifier.split(".").length];
                  if (isNaN(prereleaseBase)) {
                    this.prerelease = prerelease;
                  }
                } else {
                  this.prerelease = prerelease;
                }
              }
              break;
            }
            default:
              throw new Error(`invalid increment argument: ${release}`);
          }
          this.raw = this.format();
          if (this.build.length) {
            this.raw += `+${this.build.join(".")}`;
          }
          return this;
        }
      };
      module.exports = SemVer;
    }
  });

  // ../fl-tools-core/node_modules/semver/functions/parse.js
  var require_parse = __commonJS({
    "../fl-tools-core/node_modules/semver/functions/parse.js"(exports, module) {
      "use strict";
      var SemVer = require_semver();
      var parse = (version, options, throwErrors = false) => {
        if (version instanceof SemVer) {
          return version;
        }
        try {
          return new SemVer(version, options);
        } catch (er) {
          if (!throwErrors) {
            return null;
          }
          throw er;
        }
      };
      module.exports = parse;
    }
  });

  // ../fl-tools-core/node_modules/semver/functions/valid.js
  var require_valid = __commonJS({
    "../fl-tools-core/node_modules/semver/functions/valid.js"(exports, module) {
      "use strict";
      var parse = require_parse();
      var valid3 = (version, options) => {
        const v = parse(version, options);
        return v ? v.version : null;
      };
      module.exports = valid3;
    }
  });

  // ../fl-tools-core/node_modules/semver/functions/clean.js
  var require_clean = __commonJS({
    "../fl-tools-core/node_modules/semver/functions/clean.js"(exports, module) {
      "use strict";
      var parse = require_parse();
      var clean = (version, options) => {
        const s = parse(version.trim().replace(/^[=v]+/, ""), options);
        return s ? s.version : null;
      };
      module.exports = clean;
    }
  });

  // ../fl-tools-core/node_modules/semver/functions/inc.js
  var require_inc = __commonJS({
    "../fl-tools-core/node_modules/semver/functions/inc.js"(exports, module) {
      "use strict";
      var SemVer = require_semver();
      var inc = (version, release, options, identifier, identifierBase) => {
        if (typeof options === "string") {
          identifierBase = identifier;
          identifier = options;
          options = void 0;
        }
        try {
          return new SemVer(
            version instanceof SemVer ? version.version : version,
            options
          ).inc(release, identifier, identifierBase).version;
        } catch (er) {
          return null;
        }
      };
      module.exports = inc;
    }
  });

  // ../fl-tools-core/node_modules/semver/functions/diff.js
  var require_diff = __commonJS({
    "../fl-tools-core/node_modules/semver/functions/diff.js"(exports, module) {
      "use strict";
      var parse = require_parse();
      var diff = (version1, version2) => {
        const v1 = parse(version1, null, true);
        const v2 = parse(version2, null, true);
        const comparison = v1.compare(v2);
        if (comparison === 0) {
          return null;
        }
        const v1Higher = comparison > 0;
        const highVersion = v1Higher ? v1 : v2;
        const lowVersion = v1Higher ? v2 : v1;
        const highHasPre = !!highVersion.prerelease.length;
        const lowHasPre = !!lowVersion.prerelease.length;
        if (lowHasPre && !highHasPre) {
          if (!lowVersion.patch && !lowVersion.minor) {
            return "major";
          }
          if (lowVersion.compareMain(highVersion) === 0) {
            if (lowVersion.minor && !lowVersion.patch) {
              return "minor";
            }
            return "patch";
          }
        }
        const prefix = highHasPre ? "pre" : "";
        if (v1.major !== v2.major) {
          return prefix + "major";
        }
        if (v1.minor !== v2.minor) {
          return prefix + "minor";
        }
        if (v1.patch !== v2.patch) {
          return prefix + "patch";
        }
        return "prerelease";
      };
      module.exports = diff;
    }
  });

  // ../fl-tools-core/node_modules/semver/functions/major.js
  var require_major = __commonJS({
    "../fl-tools-core/node_modules/semver/functions/major.js"(exports, module) {
      "use strict";
      var SemVer = require_semver();
      var major = (a, loose) => new SemVer(a, loose).major;
      module.exports = major;
    }
  });

  // ../fl-tools-core/node_modules/semver/functions/minor.js
  var require_minor = __commonJS({
    "../fl-tools-core/node_modules/semver/functions/minor.js"(exports, module) {
      "use strict";
      var SemVer = require_semver();
      var minor = (a, loose) => new SemVer(a, loose).minor;
      module.exports = minor;
    }
  });

  // ../fl-tools-core/node_modules/semver/functions/patch.js
  var require_patch = __commonJS({
    "../fl-tools-core/node_modules/semver/functions/patch.js"(exports, module) {
      "use strict";
      var SemVer = require_semver();
      var patch = (a, loose) => new SemVer(a, loose).patch;
      module.exports = patch;
    }
  });

  // ../fl-tools-core/node_modules/semver/functions/prerelease.js
  var require_prerelease = __commonJS({
    "../fl-tools-core/node_modules/semver/functions/prerelease.js"(exports, module) {
      "use strict";
      var parse = require_parse();
      var prerelease = (version, options) => {
        const parsed = parse(version, options);
        return parsed && parsed.prerelease.length ? parsed.prerelease : null;
      };
      module.exports = prerelease;
    }
  });

  // ../fl-tools-core/node_modules/semver/functions/compare.js
  var require_compare = __commonJS({
    "../fl-tools-core/node_modules/semver/functions/compare.js"(exports, module) {
      "use strict";
      var SemVer = require_semver();
      var compare2 = (a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose));
      module.exports = compare2;
    }
  });

  // ../fl-tools-core/node_modules/semver/functions/rcompare.js
  var require_rcompare = __commonJS({
    "../fl-tools-core/node_modules/semver/functions/rcompare.js"(exports, module) {
      "use strict";
      var compare2 = require_compare();
      var rcompare = (a, b, loose) => compare2(b, a, loose);
      module.exports = rcompare;
    }
  });

  // ../fl-tools-core/node_modules/semver/functions/compare-loose.js
  var require_compare_loose = __commonJS({
    "../fl-tools-core/node_modules/semver/functions/compare-loose.js"(exports, module) {
      "use strict";
      var compare2 = require_compare();
      var compareLoose = (a, b) => compare2(a, b, true);
      module.exports = compareLoose;
    }
  });

  // ../fl-tools-core/node_modules/semver/functions/compare-build.js
  var require_compare_build = __commonJS({
    "../fl-tools-core/node_modules/semver/functions/compare-build.js"(exports, module) {
      "use strict";
      var SemVer = require_semver();
      var compareBuild = (a, b, loose) => {
        const versionA = new SemVer(a, loose);
        const versionB = new SemVer(b, loose);
        return versionA.compare(versionB) || versionA.compareBuild(versionB);
      };
      module.exports = compareBuild;
    }
  });

  // ../fl-tools-core/node_modules/semver/functions/sort.js
  var require_sort = __commonJS({
    "../fl-tools-core/node_modules/semver/functions/sort.js"(exports, module) {
      "use strict";
      var compareBuild = require_compare_build();
      var sort = (list, loose) => list.sort((a, b) => compareBuild(a, b, loose));
      module.exports = sort;
    }
  });

  // ../fl-tools-core/node_modules/semver/functions/rsort.js
  var require_rsort = __commonJS({
    "../fl-tools-core/node_modules/semver/functions/rsort.js"(exports, module) {
      "use strict";
      var compareBuild = require_compare_build();
      var rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose));
      module.exports = rsort;
    }
  });

  // ../fl-tools-core/node_modules/semver/functions/gt.js
  var require_gt = __commonJS({
    "../fl-tools-core/node_modules/semver/functions/gt.js"(exports, module) {
      "use strict";
      var compare2 = require_compare();
      var gt = (a, b, loose) => compare2(a, b, loose) > 0;
      module.exports = gt;
    }
  });

  // ../fl-tools-core/node_modules/semver/functions/lt.js
  var require_lt = __commonJS({
    "../fl-tools-core/node_modules/semver/functions/lt.js"(exports, module) {
      "use strict";
      var compare2 = require_compare();
      var lt = (a, b, loose) => compare2(a, b, loose) < 0;
      module.exports = lt;
    }
  });

  // ../fl-tools-core/node_modules/semver/functions/eq.js
  var require_eq = __commonJS({
    "../fl-tools-core/node_modules/semver/functions/eq.js"(exports, module) {
      "use strict";
      var compare2 = require_compare();
      var eq = (a, b, loose) => compare2(a, b, loose) === 0;
      module.exports = eq;
    }
  });

  // ../fl-tools-core/node_modules/semver/functions/neq.js
  var require_neq = __commonJS({
    "../fl-tools-core/node_modules/semver/functions/neq.js"(exports, module) {
      "use strict";
      var compare2 = require_compare();
      var neq = (a, b, loose) => compare2(a, b, loose) !== 0;
      module.exports = neq;
    }
  });

  // ../fl-tools-core/node_modules/semver/functions/gte.js
  var require_gte = __commonJS({
    "../fl-tools-core/node_modules/semver/functions/gte.js"(exports, module) {
      "use strict";
      var compare2 = require_compare();
      var gte = (a, b, loose) => compare2(a, b, loose) >= 0;
      module.exports = gte;
    }
  });

  // ../fl-tools-core/node_modules/semver/functions/lte.js
  var require_lte = __commonJS({
    "../fl-tools-core/node_modules/semver/functions/lte.js"(exports, module) {
      "use strict";
      var compare2 = require_compare();
      var lte = (a, b, loose) => compare2(a, b, loose) <= 0;
      module.exports = lte;
    }
  });

  // ../fl-tools-core/node_modules/semver/functions/cmp.js
  var require_cmp = __commonJS({
    "../fl-tools-core/node_modules/semver/functions/cmp.js"(exports, module) {
      "use strict";
      var eq = require_eq();
      var neq = require_neq();
      var gt = require_gt();
      var gte = require_gte();
      var lt = require_lt();
      var lte = require_lte();
      var cmp = (a, op, b, loose) => {
        switch (op) {
          case "===":
            if (typeof a === "object") {
              a = a.version;
            }
            if (typeof b === "object") {
              b = b.version;
            }
            return a === b;
          case "!==":
            if (typeof a === "object") {
              a = a.version;
            }
            if (typeof b === "object") {
              b = b.version;
            }
            return a !== b;
          case "":
          case "=":
          case "==":
            return eq(a, b, loose);
          case "!=":
            return neq(a, b, loose);
          case ">":
            return gt(a, b, loose);
          case ">=":
            return gte(a, b, loose);
          case "<":
            return lt(a, b, loose);
          case "<=":
            return lte(a, b, loose);
          default:
            throw new TypeError(`Invalid operator: ${op}`);
        }
      };
      module.exports = cmp;
    }
  });

  // ../fl-tools-core/node_modules/semver/functions/coerce.js
  var require_coerce = __commonJS({
    "../fl-tools-core/node_modules/semver/functions/coerce.js"(exports, module) {
      "use strict";
      var SemVer = require_semver();
      var parse = require_parse();
      var { safeRe: re, t } = require_re();
      var coerce = (version, options) => {
        if (version instanceof SemVer) {
          return version;
        }
        if (typeof version === "number") {
          version = String(version);
        }
        if (typeof version !== "string") {
          return null;
        }
        options = options || {};
        let match = null;
        if (!options.rtl) {
          match = version.match(options.includePrerelease ? re[t.COERCEFULL] : re[t.COERCE]);
        } else {
          const coerceRtlRegex = options.includePrerelease ? re[t.COERCERTLFULL] : re[t.COERCERTL];
          let next;
          while ((next = coerceRtlRegex.exec(version)) && (!match || match.index + match[0].length !== version.length)) {
            if (!match || next.index + next[0].length !== match.index + match[0].length) {
              match = next;
            }
            coerceRtlRegex.lastIndex = next.index + next[1].length + next[2].length;
          }
          coerceRtlRegex.lastIndex = -1;
        }
        if (match === null) {
          return null;
        }
        const major = match[2];
        const minor = match[3] || "0";
        const patch = match[4] || "0";
        const prerelease = options.includePrerelease && match[5] ? `-${match[5]}` : "";
        const build = options.includePrerelease && match[6] ? `+${match[6]}` : "";
        return parse(`${major}.${minor}.${patch}${prerelease}${build}`, options);
      };
      module.exports = coerce;
    }
  });

  // ../fl-tools-core/node_modules/semver/functions/truncate.js
  var require_truncate = __commonJS({
    "../fl-tools-core/node_modules/semver/functions/truncate.js"(exports, module) {
      "use strict";
      var parse = require_parse();
      var constants = require_constants();
      var SemVer = require_semver();
      var truncate = (version, truncation, options) => {
        if (!constants.RELEASE_TYPES.includes(truncation)) {
          return null;
        }
        const clonedVersion = cloneInputVersion(version, options);
        return clonedVersion && doTruncation(clonedVersion, truncation);
      };
      var cloneInputVersion = (version, options) => {
        const versionStringToParse = version instanceof SemVer ? version.version : version;
        return parse(versionStringToParse, options);
      };
      var doTruncation = (version, truncation) => {
        if (isPrerelease(truncation)) {
          return version.version;
        }
        version.prerelease = [];
        switch (truncation) {
          case "major":
            version.minor = 0;
            version.patch = 0;
            break;
          case "minor":
            version.patch = 0;
            break;
        }
        return version.format();
      };
      var isPrerelease = (type) => {
        return type.startsWith("pre");
      };
      module.exports = truncate;
    }
  });

  // ../fl-tools-core/node_modules/semver/internal/lrucache.js
  var require_lrucache = __commonJS({
    "../fl-tools-core/node_modules/semver/internal/lrucache.js"(exports, module) {
      "use strict";
      var LRUCache = class {
        constructor() {
          this.max = 1e3;
          this.map = /* @__PURE__ */ new Map();
        }
        get(key) {
          const value = this.map.get(key);
          if (value === void 0) {
            return void 0;
          } else {
            this.map.delete(key);
            this.map.set(key, value);
            return value;
          }
        }
        delete(key) {
          return this.map.delete(key);
        }
        set(key, value) {
          const deleted = this.delete(key);
          if (!deleted && value !== void 0) {
            if (this.map.size >= this.max) {
              const firstKey = this.map.keys().next().value;
              this.delete(firstKey);
            }
            this.map.set(key, value);
          }
          return this;
        }
      };
      module.exports = LRUCache;
    }
  });

  // ../fl-tools-core/node_modules/semver/classes/range.js
  var require_range = __commonJS({
    "../fl-tools-core/node_modules/semver/classes/range.js"(exports, module) {
      "use strict";
      var SPACE_CHARACTERS = /\s+/g;
      var Range = class _Range {
        constructor(range, options) {
          options = parseOptions(options);
          if (range instanceof _Range) {
            if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
              return range;
            } else {
              return new _Range(range.raw, options);
            }
          }
          if (range instanceof Comparator) {
            this.raw = range.value;
            this.set = [[range]];
            this.formatted = void 0;
            return this;
          }
          this.options = options;
          this.loose = !!options.loose;
          this.includePrerelease = !!options.includePrerelease;
          this.raw = range.trim().replace(SPACE_CHARACTERS, " ");
          this.set = this.raw.split("||").map((r) => this.parseRange(r.trim())).filter((c) => c.length);
          if (!this.set.length) {
            throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
          }
          if (this.set.length > 1) {
            const first = this.set[0];
            this.set = this.set.filter((c) => !isNullSet(c[0]));
            if (this.set.length === 0) {
              this.set = [first];
            } else if (this.set.length > 1) {
              for (const c of this.set) {
                if (c.length === 1 && isAny(c[0])) {
                  this.set = [c];
                  break;
                }
              }
            }
          }
          this.formatted = void 0;
        }
        get range() {
          if (this.formatted === void 0) {
            this.formatted = "";
            for (let i = 0; i < this.set.length; i++) {
              if (i > 0) {
                this.formatted += "||";
              }
              const comps = this.set[i];
              for (let k = 0; k < comps.length; k++) {
                if (k > 0) {
                  this.formatted += " ";
                }
                this.formatted += comps[k].toString().trim();
              }
            }
          }
          return this.formatted;
        }
        format() {
          return this.range;
        }
        toString() {
          return this.range;
        }
        parseRange(range) {
          range = range.replace(BUILDSTRIPRE, "");
          const memoOpts = (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) | (this.options.loose && FLAG_LOOSE);
          const memoKey = memoOpts + ":" + range;
          const cached = cache.get(memoKey);
          if (cached) {
            return cached;
          }
          const loose = this.options.loose;
          const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
          range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
          debug("hyphen replace", range);
          range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
          debug("comparator trim", range);
          range = range.replace(re[t.TILDETRIM], tildeTrimReplace);
          debug("tilde trim", range);
          range = range.replace(re[t.CARETTRIM], caretTrimReplace);
          debug("caret trim", range);
          let rangeList = range.split(" ").map((comp) => parseComparator(comp, this.options)).join(" ").split(/\s+/).map((comp) => replaceGTE0(comp, this.options));
          if (loose) {
            rangeList = rangeList.filter((comp) => {
              debug("loose invalid filter", comp, this.options);
              return !!comp.match(re[t.COMPARATORLOOSE]);
            });
          }
          debug("range list", rangeList);
          const rangeMap = /* @__PURE__ */ new Map();
          const comparators = rangeList.map((comp) => new Comparator(comp, this.options));
          for (const comp of comparators) {
            if (isNullSet(comp)) {
              return [comp];
            }
            rangeMap.set(comp.value, comp);
          }
          if (rangeMap.size > 1 && rangeMap.has("")) {
            rangeMap.delete("");
          }
          const result3 = [...rangeMap.values()];
          cache.set(memoKey, result3);
          return result3;
        }
        intersects(range, options) {
          if (!(range instanceof _Range)) {
            throw new TypeError("a Range is required");
          }
          return this.set.some((thisComparators) => {
            return isSatisfiable(thisComparators, options) && range.set.some((rangeComparators) => {
              return isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator) => {
                return rangeComparators.every((rangeComparator) => {
                  return thisComparator.intersects(rangeComparator, options);
                });
              });
            });
          });
        }
        // if ANY of the sets match ALL of its comparators, then pass
        test(version) {
          if (!version) {
            return false;
          }
          if (typeof version === "string") {
            try {
              version = new SemVer(version, this.options);
            } catch (er) {
              return false;
            }
          }
          for (let i = 0; i < this.set.length; i++) {
            if (testSet(this.set[i], version, this.options)) {
              return true;
            }
          }
          return false;
        }
      };
      module.exports = Range;
      var LRU = require_lrucache();
      var cache = new LRU();
      var parseOptions = require_parse_options();
      var Comparator = require_comparator();
      var debug = require_debug();
      var SemVer = require_semver();
      var {
        safeRe: re,
        src,
        t,
        comparatorTrimReplace,
        tildeTrimReplace,
        caretTrimReplace
      } = require_re();
      var { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = require_constants();
      var BUILDSTRIPRE = new RegExp(src[t.BUILD], "g");
      var isNullSet = (c) => c.value === "<0.0.0-0";
      var isAny = (c) => c.value === "";
      var isSatisfiable = (comparators, options) => {
        let result3 = true;
        const remainingComparators = comparators.slice();
        let testComparator = remainingComparators.pop();
        while (result3 && remainingComparators.length) {
          result3 = remainingComparators.every((otherComparator) => {
            return testComparator.intersects(otherComparator, options);
          });
          testComparator = remainingComparators.pop();
        }
        return result3;
      };
      var parseComparator = (comp, options) => {
        comp = comp.replace(re[t.BUILD], "");
        debug("comp", comp, options);
        comp = replaceCarets(comp, options);
        debug("caret", comp);
        comp = replaceTildes(comp, options);
        debug("tildes", comp);
        comp = replaceXRanges(comp, options);
        debug("xrange", comp);
        comp = replaceStars(comp, options);
        debug("stars", comp);
        return comp;
      };
      var isX = (id) => !id || id.toLowerCase() === "x" || id === "*";
      var invalidXRangeOrder = (M, m, p) => isX(M) && !isX(m) || isX(m) && p && !isX(p);
      var replaceTildes = (comp, options) => {
        return comp.trim().split(/\s+/).map((c) => replaceTilde(c, options)).join(" ");
      };
      var replaceTilde = (comp, options) => {
        const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
        const z = options.includePrerelease ? "-0" : "";
        return comp.replace(r, (_, M, m, p, pr) => {
          debug("tilde", comp, _, M, m, p, pr);
          let ret;
          if (isX(M)) {
            ret = "";
          } else if (isX(m)) {
            ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
          } else if (isX(p)) {
            ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
          } else if (pr) {
            debug("replaceTilde pr", pr);
            ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
          } else {
            ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
          }
          debug("tilde return", ret);
          return ret;
        });
      };
      var replaceCarets = (comp, options) => {
        return comp.trim().split(/\s+/).map((c) => replaceCaret(c, options)).join(" ");
      };
      var replaceCaret = (comp, options) => {
        debug("caret", comp, options);
        const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
        const z = options.includePrerelease ? "-0" : "";
        return comp.replace(r, (_, M, m, p, pr) => {
          debug("caret", comp, _, M, m, p, pr);
          let ret;
          if (isX(M)) {
            ret = "";
          } else if (isX(m)) {
            ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
          } else if (isX(p)) {
            if (M === "0") {
              ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
            } else {
              ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
            }
          } else if (pr) {
            debug("replaceCaret pr", pr);
            if (M === "0") {
              if (m === "0") {
                ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
              } else {
                ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
              }
            } else {
              ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
            }
          } else {
            debug("no pr");
            if (M === "0") {
              if (m === "0") {
                ret = `>=${M}.${m}.${p} <${M}.${m}.${+p + 1}-0`;
              } else {
                ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
              }
            } else {
              ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
            }
          }
          debug("caret return", ret);
          return ret;
        });
      };
      var replaceXRanges = (comp, options) => {
        debug("replaceXRanges", comp, options);
        return comp.split(/\s+/).map((c) => replaceXRange(c, options)).join(" ");
      };
      var replaceXRange = (comp, options) => {
        comp = comp.trim();
        const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
        return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
          debug("xRange", comp, ret, gtlt, M, m, p, pr);
          if (invalidXRangeOrder(M, m, p)) {
            return comp;
          }
          const xM = isX(M);
          const xm = xM || isX(m);
          const xp = xm || isX(p);
          const anyX = xp;
          if (gtlt === "=" && anyX) {
            gtlt = "";
          }
          pr = options.includePrerelease ? "-0" : "";
          if (xM) {
            if (gtlt === ">" || gtlt === "<") {
              ret = "<0.0.0-0";
            } else {
              ret = "*";
            }
          } else if (gtlt && anyX) {
            if (xm) {
              m = 0;
            }
            p = 0;
            if (gtlt === ">") {
              gtlt = ">=";
              if (xm) {
                M = +M + 1;
                m = 0;
                p = 0;
              } else {
                m = +m + 1;
                p = 0;
              }
            } else if (gtlt === "<=") {
              gtlt = "<";
              if (xm) {
                M = +M + 1;
              } else {
                m = +m + 1;
              }
            }
            if (gtlt === "<") {
              pr = "-0";
            }
            ret = `${gtlt + M}.${m}.${p}${pr}`;
          } else if (xm) {
            ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
          } else if (xp) {
            ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
          }
          debug("xRange return", ret);
          return ret;
        });
      };
      var replaceStars = (comp, options) => {
        debug("replaceStars", comp, options);
        return comp.trim().replace(re[t.STAR], "");
      };
      var replaceGTE0 = (comp, options) => {
        debug("replaceGTE0", comp, options);
        return comp.trim().replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], "");
      };
      var hyphenReplace = (incPr) => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr) => {
        if (isX(fM)) {
          from = "";
        } else if (isX(fm)) {
          from = `>=${fM}.0.0${incPr ? "-0" : ""}`;
        } else if (isX(fp)) {
          from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`;
        } else if (fpr) {
          from = `>=${from}`;
        } else {
          from = `>=${from}${incPr ? "-0" : ""}`;
        }
        if (isX(tM)) {
          to = "";
        } else if (isX(tm)) {
          to = `<${+tM + 1}.0.0-0`;
        } else if (isX(tp)) {
          to = `<${tM}.${+tm + 1}.0-0`;
        } else if (tpr) {
          to = `<=${tM}.${tm}.${tp}-${tpr}`;
        } else if (incPr) {
          to = `<${tM}.${tm}.${+tp + 1}-0`;
        } else {
          to = `<=${to}`;
        }
        return `${from} ${to}`.trim();
      };
      var testSet = (set, version, options) => {
        for (let i = 0; i < set.length; i++) {
          if (!set[i].test(version)) {
            return false;
          }
        }
        if (version.prerelease.length && !options.includePrerelease) {
          for (let i = 0; i < set.length; i++) {
            debug(set[i].semver);
            if (set[i].semver === Comparator.ANY) {
              continue;
            }
            if (set[i].semver.prerelease.length > 0) {
              const allowed = set[i].semver;
              if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
                return true;
              }
            }
          }
          return false;
        }
        return true;
      };
    }
  });

  // ../fl-tools-core/node_modules/semver/classes/comparator.js
  var require_comparator = __commonJS({
    "../fl-tools-core/node_modules/semver/classes/comparator.js"(exports, module) {
      "use strict";
      var ANY = /* @__PURE__ */ Symbol("SemVer ANY");
      var Comparator = class _Comparator {
        static get ANY() {
          return ANY;
        }
        constructor(comp, options) {
          options = parseOptions(options);
          if (comp instanceof _Comparator) {
            if (comp.loose === !!options.loose) {
              return comp;
            } else {
              comp = comp.value;
            }
          }
          comp = comp.trim().split(/\s+/).join(" ");
          debug("comparator", comp, options);
          this.options = options;
          this.loose = !!options.loose;
          this.parse(comp);
          if (this.semver === ANY) {
            this.value = "";
          } else {
            this.value = this.operator + this.semver.version;
          }
          debug("comp", this);
        }
        parse(comp) {
          const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
          const m = comp.match(r);
          if (!m) {
            throw new TypeError(`Invalid comparator: ${comp}`);
          }
          this.operator = m[1] !== void 0 ? m[1] : "";
          if (this.operator === "=") {
            this.operator = "";
          }
          if (!m[2]) {
            this.semver = ANY;
          } else {
            this.semver = new SemVer(m[2], this.options.loose);
          }
        }
        toString() {
          return this.value;
        }
        test(version) {
          debug("Comparator.test", version, this.options.loose);
          if (this.semver === ANY || version === ANY) {
            return true;
          }
          if (typeof version === "string") {
            try {
              version = new SemVer(version, this.options);
            } catch (er) {
              return false;
            }
          }
          return cmp(version, this.operator, this.semver, this.options);
        }
        intersects(comp, options) {
          if (!(comp instanceof _Comparator)) {
            throw new TypeError("a Comparator is required");
          }
          if (this.operator === "") {
            if (this.value === "") {
              return true;
            }
            return new Range(comp.value, options).test(this.value);
          } else if (comp.operator === "") {
            if (comp.value === "") {
              return true;
            }
            return new Range(this.value, options).test(comp.semver);
          }
          options = parseOptions(options);
          if (options.includePrerelease && (this.value === "<0.0.0-0" || comp.value === "<0.0.0-0")) {
            return false;
          }
          if (!options.includePrerelease && (this.value.startsWith("<0.0.0") || comp.value.startsWith("<0.0.0"))) {
            return false;
          }
          if (this.operator.startsWith(">") && comp.operator.startsWith(">")) {
            return true;
          }
          if (this.operator.startsWith("<") && comp.operator.startsWith("<")) {
            return true;
          }
          if (this.semver.version === comp.semver.version && this.operator.includes("=") && comp.operator.includes("=")) {
            return true;
          }
          if (cmp(this.semver, "<", comp.semver, options) && this.operator.startsWith(">") && comp.operator.startsWith("<")) {
            return true;
          }
          if (cmp(this.semver, ">", comp.semver, options) && this.operator.startsWith("<") && comp.operator.startsWith(">")) {
            return true;
          }
          return false;
        }
      };
      module.exports = Comparator;
      var parseOptions = require_parse_options();
      var { safeRe: re, t } = require_re();
      var cmp = require_cmp();
      var debug = require_debug();
      var SemVer = require_semver();
      var Range = require_range();
    }
  });

  // ../fl-tools-core/node_modules/semver/functions/satisfies.js
  var require_satisfies = __commonJS({
    "../fl-tools-core/node_modules/semver/functions/satisfies.js"(exports, module) {
      "use strict";
      var Range = require_range();
      var satisfies2 = (version, range, options) => {
        try {
          range = new Range(range, options);
        } catch (er) {
          return false;
        }
        return range.test(version);
      };
      module.exports = satisfies2;
    }
  });

  // ../fl-tools-core/node_modules/semver/ranges/to-comparators.js
  var require_to_comparators = __commonJS({
    "../fl-tools-core/node_modules/semver/ranges/to-comparators.js"(exports, module) {
      "use strict";
      var Range = require_range();
      var toComparators = (range, options) => new Range(range, options).set.map((comp) => comp.map((c) => c.value).join(" ").trim().split(" "));
      module.exports = toComparators;
    }
  });

  // ../fl-tools-core/node_modules/semver/ranges/max-satisfying.js
  var require_max_satisfying = __commonJS({
    "../fl-tools-core/node_modules/semver/ranges/max-satisfying.js"(exports, module) {
      "use strict";
      var SemVer = require_semver();
      var Range = require_range();
      var maxSatisfying = (versions, range, options) => {
        let max = null;
        let maxSV = null;
        let rangeObj = null;
        try {
          rangeObj = new Range(range, options);
        } catch (er) {
          return null;
        }
        versions.forEach((v) => {
          if (rangeObj.test(v)) {
            if (!max || maxSV.compare(v) === -1) {
              max = v;
              maxSV = new SemVer(max, options);
            }
          }
        });
        return max;
      };
      module.exports = maxSatisfying;
    }
  });

  // ../fl-tools-core/node_modules/semver/ranges/min-satisfying.js
  var require_min_satisfying = __commonJS({
    "../fl-tools-core/node_modules/semver/ranges/min-satisfying.js"(exports, module) {
      "use strict";
      var SemVer = require_semver();
      var Range = require_range();
      var minSatisfying = (versions, range, options) => {
        let min = null;
        let minSV = null;
        let rangeObj = null;
        try {
          rangeObj = new Range(range, options);
        } catch (er) {
          return null;
        }
        versions.forEach((v) => {
          if (rangeObj.test(v)) {
            if (!min || minSV.compare(v) === 1) {
              min = v;
              minSV = new SemVer(min, options);
            }
          }
        });
        return min;
      };
      module.exports = minSatisfying;
    }
  });

  // ../fl-tools-core/node_modules/semver/ranges/min-version.js
  var require_min_version = __commonJS({
    "../fl-tools-core/node_modules/semver/ranges/min-version.js"(exports, module) {
      "use strict";
      var SemVer = require_semver();
      var Range = require_range();
      var gt = require_gt();
      var minVersion = (range, loose) => {
        range = new Range(range, loose);
        let minver = new SemVer("0.0.0");
        if (range.test(minver)) {
          return minver;
        }
        minver = new SemVer("0.0.0-0");
        if (range.test(minver)) {
          return minver;
        }
        minver = null;
        for (let i = 0; i < range.set.length; ++i) {
          const comparators = range.set[i];
          let setMin = null;
          comparators.forEach((comparator) => {
            const compver = new SemVer(comparator.semver.version);
            switch (comparator.operator) {
              case ">":
                if (compver.prerelease.length === 0) {
                  compver.patch++;
                } else {
                  compver.prerelease.push(0);
                }
                compver.raw = compver.format();
              /* fallthrough */
              case "":
              case ">=":
                if (!setMin || gt(compver, setMin)) {
                  setMin = compver;
                }
                break;
              case "<":
              case "<=":
                break;
              /* istanbul ignore next */
              default:
                throw new Error(`Unexpected operation: ${comparator.operator}`);
            }
          });
          if (setMin && (!minver || gt(minver, setMin))) {
            minver = setMin;
          }
        }
        if (minver && range.test(minver)) {
          return minver;
        }
        return null;
      };
      module.exports = minVersion;
    }
  });

  // ../fl-tools-core/node_modules/semver/ranges/valid.js
  var require_valid2 = __commonJS({
    "../fl-tools-core/node_modules/semver/ranges/valid.js"(exports, module) {
      "use strict";
      var Range = require_range();
      var validRange2 = (range, options) => {
        try {
          return new Range(range, options).range || "*";
        } catch (er) {
          return null;
        }
      };
      module.exports = validRange2;
    }
  });

  // ../fl-tools-core/node_modules/semver/ranges/outside.js
  var require_outside = __commonJS({
    "../fl-tools-core/node_modules/semver/ranges/outside.js"(exports, module) {
      "use strict";
      var SemVer = require_semver();
      var Comparator = require_comparator();
      var { ANY } = Comparator;
      var Range = require_range();
      var satisfies2 = require_satisfies();
      var gt = require_gt();
      var lt = require_lt();
      var lte = require_lte();
      var gte = require_gte();
      var outside = (version, range, hilo, options) => {
        version = new SemVer(version, options);
        range = new Range(range, options);
        let gtfn, ltefn, ltfn, comp, ecomp;
        switch (hilo) {
          case ">":
            gtfn = gt;
            ltefn = lte;
            ltfn = lt;
            comp = ">";
            ecomp = ">=";
            break;
          case "<":
            gtfn = lt;
            ltefn = gte;
            ltfn = gt;
            comp = "<";
            ecomp = "<=";
            break;
          default:
            throw new TypeError('Must provide a hilo val of "<" or ">"');
        }
        if (satisfies2(version, range, options)) {
          return false;
        }
        for (let i = 0; i < range.set.length; ++i) {
          const comparators = range.set[i];
          let high = null;
          let low = null;
          comparators.forEach((comparator) => {
            if (comparator.semver === ANY) {
              comparator = new Comparator(">=0.0.0");
            }
            high = high || comparator;
            low = low || comparator;
            if (gtfn(comparator.semver, high.semver, options)) {
              high = comparator;
            } else if (ltfn(comparator.semver, low.semver, options)) {
              low = comparator;
            }
          });
          if (high.operator === comp || high.operator === ecomp) {
            return false;
          }
          if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
            return false;
          } else if (low.operator === ecomp && ltfn(version, low.semver)) {
            return false;
          }
        }
        return true;
      };
      module.exports = outside;
    }
  });

  // ../fl-tools-core/node_modules/semver/ranges/gtr.js
  var require_gtr = __commonJS({
    "../fl-tools-core/node_modules/semver/ranges/gtr.js"(exports, module) {
      "use strict";
      var outside = require_outside();
      var gtr = (version, range, options) => outside(version, range, ">", options);
      module.exports = gtr;
    }
  });

  // ../fl-tools-core/node_modules/semver/ranges/ltr.js
  var require_ltr = __commonJS({
    "../fl-tools-core/node_modules/semver/ranges/ltr.js"(exports, module) {
      "use strict";
      var outside = require_outside();
      var ltr = (version, range, options) => outside(version, range, "<", options);
      module.exports = ltr;
    }
  });

  // ../fl-tools-core/node_modules/semver/ranges/intersects.js
  var require_intersects = __commonJS({
    "../fl-tools-core/node_modules/semver/ranges/intersects.js"(exports, module) {
      "use strict";
      var Range = require_range();
      var intersects = (r1, r2, options) => {
        r1 = new Range(r1, options);
        r2 = new Range(r2, options);
        return r1.intersects(r2, options);
      };
      module.exports = intersects;
    }
  });

  // ../fl-tools-core/node_modules/semver/ranges/simplify.js
  var require_simplify = __commonJS({
    "../fl-tools-core/node_modules/semver/ranges/simplify.js"(exports, module) {
      "use strict";
      var satisfies2 = require_satisfies();
      var compare2 = require_compare();
      module.exports = (versions, range, options) => {
        const set = [];
        let first = null;
        let prev = null;
        const v = versions.sort((a, b) => compare2(a, b, options));
        for (const version of v) {
          const included = satisfies2(version, range, options);
          if (included) {
            prev = version;
            if (!first) {
              first = version;
            }
          } else {
            if (prev) {
              set.push([first, prev]);
            }
            prev = null;
            first = null;
          }
        }
        if (first) {
          set.push([first, null]);
        }
        const ranges = [];
        for (const [min, max] of set) {
          if (min === max) {
            ranges.push(min);
          } else if (!max && min === v[0]) {
            ranges.push("*");
          } else if (!max) {
            ranges.push(`>=${min}`);
          } else if (min === v[0]) {
            ranges.push(`<=${max}`);
          } else {
            ranges.push(`${min} - ${max}`);
          }
        }
        const simplified = ranges.join(" || ");
        const original = typeof range.raw === "string" ? range.raw : String(range);
        return simplified.length < original.length ? simplified : range;
      };
    }
  });

  // ../fl-tools-core/node_modules/semver/ranges/subset.js
  var require_subset = __commonJS({
    "../fl-tools-core/node_modules/semver/ranges/subset.js"(exports, module) {
      "use strict";
      var Range = require_range();
      var Comparator = require_comparator();
      var { ANY } = Comparator;
      var satisfies2 = require_satisfies();
      var compare2 = require_compare();
      var subset = (sub, dom, options = {}) => {
        if (sub === dom) {
          return true;
        }
        sub = new Range(sub, options);
        dom = new Range(dom, options);
        let sawNonNull = false;
        OUTER: for (const simpleSub of sub.set) {
          for (const simpleDom of dom.set) {
            const isSub = simpleSubset(simpleSub, simpleDom, options);
            sawNonNull = sawNonNull || isSub !== null;
            if (isSub) {
              continue OUTER;
            }
          }
          if (sawNonNull) {
            return false;
          }
        }
        return true;
      };
      var minimumVersionWithPreRelease = [new Comparator(">=0.0.0-0")];
      var minimumVersion = [new Comparator(">=0.0.0")];
      var simpleSubset = (sub, dom, options) => {
        if (sub === dom) {
          return true;
        }
        if (sub.length === 1 && sub[0].semver === ANY) {
          if (dom.length === 1 && dom[0].semver === ANY) {
            return true;
          } else if (options.includePrerelease) {
            sub = minimumVersionWithPreRelease;
          } else {
            sub = minimumVersion;
          }
        }
        if (dom.length === 1 && dom[0].semver === ANY) {
          if (options.includePrerelease) {
            return true;
          } else {
            dom = minimumVersion;
          }
        }
        const eqSet = /* @__PURE__ */ new Set();
        let gt, lt;
        for (const c of sub) {
          if (c.operator === ">" || c.operator === ">=") {
            gt = higherGT(gt, c, options);
          } else if (c.operator === "<" || c.operator === "<=") {
            lt = lowerLT(lt, c, options);
          } else {
            eqSet.add(c.semver);
          }
        }
        if (eqSet.size > 1) {
          return null;
        }
        let gtltComp;
        if (gt && lt) {
          gtltComp = compare2(gt.semver, lt.semver, options);
          if (gtltComp > 0) {
            return null;
          } else if (gtltComp === 0 && (gt.operator !== ">=" || lt.operator !== "<=")) {
            return null;
          }
        }
        for (const eq of eqSet) {
          if (gt && !satisfies2(eq, String(gt), options)) {
            return null;
          }
          if (lt && !satisfies2(eq, String(lt), options)) {
            return null;
          }
          for (const c of dom) {
            if (!satisfies2(eq, String(c), options)) {
              return false;
            }
          }
          return true;
        }
        let higher, lower;
        let hasDomLT, hasDomGT;
        let needDomLTPre = lt && !options.includePrerelease && lt.semver.prerelease.length ? lt.semver : false;
        let needDomGTPre = gt && !options.includePrerelease && gt.semver.prerelease.length ? gt.semver : false;
        if (needDomLTPre && needDomLTPre.prerelease.length === 1 && lt.operator === "<" && needDomLTPre.prerelease[0] === 0) {
          needDomLTPre = false;
        }
        for (const c of dom) {
          hasDomGT = hasDomGT || c.operator === ">" || c.operator === ">=";
          hasDomLT = hasDomLT || c.operator === "<" || c.operator === "<=";
          if (gt) {
            if (needDomGTPre) {
              if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomGTPre.major && c.semver.minor === needDomGTPre.minor && c.semver.patch === needDomGTPre.patch) {
                needDomGTPre = false;
              }
            }
            if (c.operator === ">" || c.operator === ">=") {
              higher = higherGT(gt, c, options);
              if (higher === c && higher !== gt) {
                return false;
              }
            } else if (gt.operator === ">=" && !c.test(gt.semver)) {
              return false;
            }
          }
          if (lt) {
            if (needDomLTPre) {
              if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomLTPre.major && c.semver.minor === needDomLTPre.minor && c.semver.patch === needDomLTPre.patch) {
                needDomLTPre = false;
              }
            }
            if (c.operator === "<" || c.operator === "<=") {
              lower = lowerLT(lt, c, options);
              if (lower === c && lower !== lt) {
                return false;
              }
            } else if (lt.operator === "<=" && !c.test(lt.semver)) {
              return false;
            }
          }
          if (!c.operator && (lt || gt) && gtltComp !== 0) {
            return false;
          }
        }
        if (gt && hasDomLT && !lt && gtltComp !== 0) {
          return false;
        }
        if (lt && hasDomGT && !gt && gtltComp !== 0) {
          return false;
        }
        if (needDomGTPre || needDomLTPre) {
          return false;
        }
        return true;
      };
      var higherGT = (a, b, options) => {
        if (!a) {
          return b;
        }
        const comp = compare2(a.semver, b.semver, options);
        return comp > 0 ? a : comp < 0 ? b : b.operator === ">" && a.operator === ">=" ? b : a;
      };
      var lowerLT = (a, b, options) => {
        if (!a) {
          return b;
        }
        const comp = compare2(a.semver, b.semver, options);
        return comp < 0 ? a : comp > 0 ? b : b.operator === "<" && a.operator === "<=" ? b : a;
      };
      module.exports = subset;
    }
  });

  // ../fl-tools-core/node_modules/semver/index.js
  var require_semver2 = __commonJS({
    "../fl-tools-core/node_modules/semver/index.js"(exports, module) {
      "use strict";
      var internalRe = require_re();
      var constants = require_constants();
      var SemVer = require_semver();
      var identifiers = require_identifiers();
      var parse = require_parse();
      var valid3 = require_valid();
      var clean = require_clean();
      var inc = require_inc();
      var diff = require_diff();
      var major = require_major();
      var minor = require_minor();
      var patch = require_patch();
      var prerelease = require_prerelease();
      var compare2 = require_compare();
      var rcompare = require_rcompare();
      var compareLoose = require_compare_loose();
      var compareBuild = require_compare_build();
      var sort = require_sort();
      var rsort = require_rsort();
      var gt = require_gt();
      var lt = require_lt();
      var eq = require_eq();
      var neq = require_neq();
      var gte = require_gte();
      var lte = require_lte();
      var cmp = require_cmp();
      var coerce = require_coerce();
      var truncate = require_truncate();
      var Comparator = require_comparator();
      var Range = require_range();
      var satisfies2 = require_satisfies();
      var toComparators = require_to_comparators();
      var maxSatisfying = require_max_satisfying();
      var minSatisfying = require_min_satisfying();
      var minVersion = require_min_version();
      var validRange2 = require_valid2();
      var outside = require_outside();
      var gtr = require_gtr();
      var ltr = require_ltr();
      var intersects = require_intersects();
      var simplifyRange = require_simplify();
      var subset = require_subset();
      module.exports = {
        parse,
        valid: valid3,
        clean,
        inc,
        diff,
        major,
        minor,
        patch,
        prerelease,
        compare: compare2,
        rcompare,
        compareLoose,
        compareBuild,
        sort,
        rsort,
        gt,
        lt,
        eq,
        neq,
        gte,
        lte,
        cmp,
        coerce,
        truncate,
        Comparator,
        Range,
        satisfies: satisfies2,
        toComparators,
        maxSatisfying,
        minSatisfying,
        minVersion,
        validRange: validRange2,
        outside,
        gtr,
        ltr,
        intersects,
        simplifyRange,
        subset,
        SemVer,
        re: internalRe.re,
        src: internalRe.src,
        tokens: internalRe.t,
        SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
        RELEASE_TYPES: constants.RELEASE_TYPES,
        compareIdentifiers: identifiers.compareIdentifiers,
        rcompareIdentifiers: identifiers.rcompareIdentifiers
      };
    }
  });

  // src/navigation.js
  var FIXED_SHORTCUTS = Object.freeze({
    browse: "Alt+Shift+B",
    standard: "1",
    clean: "2",
    sfw: "3",
    previousCard: "J",
    nextCard: "K",
    openCard: "Enter",
    next: "N",
    top: "T"
  });
  function isEditable(target) {
    return target?.isContentEditable || target?.closest?.(
      'input, select, textarea, button, a[href], summary, [role="button"], [role="textbox"], [contenteditable]:not([contenteditable="false"])'
    ) || ["INPUT", "SELECT", "TEXTAREA"].includes(String(target?.tagName ?? "").toUpperCase());
  }
  function pressedShortcut(event) {
    const key = event.code?.startsWith("Key") ? event.code.slice(3) : event.code?.startsWith("Digit") ? event.code.slice(5) : event.key.length === 1 ? event.key.toUpperCase() : event.key;
    return [
      ...event.ctrlKey ? ["Ctrl"] : [],
      ...event.altKey ? ["Alt"] : [],
      ...event.shiftKey ? ["Shift"] : [],
      ...event.metaKey ? ["Meta"] : [],
      key
    ].join("+");
  }
  var BasicNavigation = class {
    #document;
    #handlers;
    #onKeyDown;
    #window;
    constructor({ document, window, handlers }) {
      if (!document?.addEventListener || !window || !handlers) {
        throw new TypeError("Basic navigation dependencies are required");
      }
      this.#document = document;
      this.#window = window;
      this.#handlers = handlers;
      this.#onKeyDown = (event) => {
        if (event.defaultPrevented || event.isComposing || event.repeat || isEditable(event.target)) {
          return;
        }
        const action = Object.entries(FIXED_SHORTCUTS).find(
          ([, shortcut]) => pressedShortcut(event) === shortcut
        )?.[0];
        if (!action) return;
        event.preventDefault();
        if (action === "top") {
          (this.#handlers.top ?? (() => this.#window.scrollTo({
            behavior: this.#window.document.documentElement.classList.contains("flt-reduce-motion") || this.#window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
            top: 0
          })))();
          return;
        }
        this.#handlers[action]?.();
      };
    }
    start() {
      this.#document.addEventListener("keydown", this.#onKeyDown);
    }
    stop() {
      this.#document.removeEventListener("keydown", this.#onKeyDown);
    }
  };

  // src/settings.js
  var freeze = (value) => Object.freeze(value);
  var BUILT_IN_PRESETS = freeze({
    default: freeze({
      feed: freeze({ focus: "all" }),
      filters: freeze({
        age: freeze({ maximum: 80, minimum: 18 }),
        combine: "and",
        genders: freeze([]),
        locations: freeze([]),
        minimumContent: freeze({ pictures: null, videos: null, writings: null }),
        relationships: freeze(["none", "following", "follows-you", "friends"]),
        resultMode: "dim",
        roleMode: "required",
        roles: freeze([]),
        scopes: freeze(["card"]),
        terms: freeze({ exclude: freeze([]), include: freeze([]), limit: freeze([]) })
      }),
      infiniteScroll: freeze({ enabled: true, pageLimit: 5 }),
      media: freeze({
        blurAvatars: false,
        blurPixels: 4,
        blurVideos: true,
        mode: "show",
        preset: "nsfw"
      }),
      pageEnhancements: freeze({
        exactTimestamps: true,
        hideBanners: false,
        pictureNavigation: true,
        sharedInterests: true,
        visitedLinks: true
      }),
      seen: freeze({ presentation: "normal", showChip: true }),
      ui: freeze({ notifications: true })
    }),
    minimal: freeze({
      feed: freeze({ focus: "focused" }),
      filters: freeze({
        age: freeze({ maximum: 80, minimum: 18 }),
        combine: "and",
        genders: freeze([]),
        locations: freeze([]),
        minimumContent: freeze({ pictures: null, videos: null, writings: null }),
        relationships: freeze(["none", "following", "follows-you", "friends"]),
        resultMode: "hide",
        roleMode: "required",
        roles: freeze([]),
        scopes: freeze(["card"]),
        terms: freeze({ exclude: freeze([]), include: freeze([]), limit: freeze([]) })
      }),
      infiniteScroll: freeze({ enabled: false, pageLimit: 1 }),
      media: freeze({
        blurAvatars: true,
        blurPixels: 4,
        blurVideos: true,
        mode: "blur",
        preset: "sfw"
      }),
      pageEnhancements: freeze({
        exactTimestamps: false,
        hideBanners: true,
        pictureNavigation: false,
        sharedInterests: false,
        visitedLinks: false
      }),
      seen: freeze({ presentation: "dim", showChip: false }),
      ui: freeze({ notifications: false })
    }),
    sfw: freeze({
      feed: freeze({ focus: "focused" }),
      filters: freeze({
        age: freeze({ maximum: 80, minimum: 18 }),
        combine: "and",
        genders: freeze([]),
        locations: freeze([]),
        minimumContent: freeze({ pictures: null, videos: null, writings: null }),
        relationships: freeze(["none", "following", "follows-you", "friends"]),
        resultMode: "dim",
        roleMode: "required",
        roles: freeze([]),
        scopes: freeze(["card"]),
        terms: freeze({ exclude: freeze([]), include: freeze([]), limit: freeze([]) })
      }),
      infiniteScroll: freeze({ enabled: true, pageLimit: 5 }),
      media: freeze({
        blurAvatars: true,
        blurPixels: 6,
        blurVideos: true,
        mode: "blur",
        preset: "sfw"
      }),
      pageEnhancements: freeze({
        exactTimestamps: true,
        hideBanners: true,
        pictureNavigation: true,
        sharedInterests: true,
        visitedLinks: true
      }),
      seen: freeze({ presentation: "normal", showChip: true }),
      ui: freeze({ notifications: true })
    })
  });
  var BASIC_DEFAULTS = freeze({
    feed: freeze({ focus: "all" }),
    filters: freeze({
      age: freeze({ maximum: null, minimum: null }),
      combine: "and",
      genders: freeze([]),
      locations: freeze([]),
      minimumContent: freeze({ pictures: null, videos: null, writings: null }),
      resultMode: "hide",
      relationships: freeze([]),
      roleMode: "required",
      roles: freeze([]),
      scopes: freeze(["card", "tags", "nickname"]),
      terms: freeze({
        exclude: freeze([]),
        history: freeze({
          exclude: freeze([]),
          include: freeze([]),
          limit: freeze([])
        }),
        include: freeze([]),
        limit: freeze([])
      })
    }),
    infiniteScroll: freeze({ enabled: false, pageLimit: 5 }),
    media: freeze({
      blurAvatars: false,
      blurPixels: 4,
      blurVideos: true,
      mode: "show",
      preset: "nsfw"
    }),
    navigation: freeze({
      shortcuts: FIXED_SHORTCUTS
    }),
    pageEnhancements: freeze({
      exactTimestamps: true,
      hideBanners: false,
      pictureNavigation: true,
      sharedInterests: true,
      visitedLinks: true
    }),
    preset: "default",
    presets: freeze({ custom: freeze({}) }),
    seen: freeze({ presentation: "normal", showChip: true }),
    softBlock: freeze({ presentation: "hide" }),
    ui: freeze({
      compact: false,
      dock: "right",
      highContrast: false,
      menuWidth: "full",
      notifications: true
    })
  });
  function object(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
  }
  function clone(value) {
    return globalThis.structuredClone(value);
  }
  function merge(target, source) {
    if (!object(source)) return target;
    for (const [key, value] of Object.entries(source)) {
      if (!(key in target)) continue;
      target[key] = object(value) && object(target[key]) ? merge(target[key], value) : clone(value);
    }
    return target;
  }
  function normalizeBasicSettings(value = {}) {
    const suppliedCustom = value?.presets?.custom;
    if (suppliedCustom !== void 0 && !object(suppliedCustom)) {
      throw new TypeError("Basic custom presets are invalid");
    }
    const settings = merge(clone(BASIC_DEFAULTS), value);
    settings.presets.custom = {};
    for (const [name, policy] of Object.entries(suppliedCustom ?? {})) {
      if (customPresetName(name) !== name || !object(policy) || "presets" in policy) {
        throw new TypeError("Basic custom preset policy is invalid");
      }
      const normalizedPolicy = normalizeBasicSettings({
        ...policy,
        preset: name,
        presets: { custom: {} }
      });
      delete normalizedPolicy.presets;
      settings.presets.custom[name] = normalizedPolicy;
    }
    const legacySaved = value?.filters?.terms?.saved;
    if (Array.isArray(legacySaved)) {
      settings.filters.terms.history.include = [
        .../* @__PURE__ */ new Set([...settings.filters.terms.history.include, ...legacySaved])
      ];
    }
    if (typeof settings.preset !== "string" || !settings.preset) settings.preset = "default";
    const {
      feed,
      filters,
      infiniteScroll,
      media,
      navigation,
      pageEnhancements,
      seen,
      softBlock,
      ui
    } = settings;
    ui.dock = "right";
    const ageValid = [filters.age.minimum, filters.age.maximum].every(
      (age) => age === null || Number.isInteger(age) && age >= 18 && age <= 999
    );
    if (!ageValid || filters.age.minimum !== null && filters.age.maximum !== null && filters.age.minimum > filters.age.maximum || !["and", "or"].includes(filters.combine) || !["all", "focused"].includes(feed.focus) || !["hide", "dim"].includes(filters.resultMode) || !["required", "preferred"].includes(filters.roleMode) || !["show", "blur", "hide"].includes(media.mode) || !["sfw", "nsfw"].includes(media.preset) || !Number.isInteger(media.blurPixels) || media.blurPixels < 1 || media.blurPixels > 10 || !Number.isInteger(infiniteScroll.pageLimit) || infiniteScroll.pageLimit < 1 || infiniteScroll.pageLimit > 20 || !["normal", "dim", "hide"].includes(seen.presentation) || !["dim", "hide"].includes(softBlock.presentation) || !["left", "right"].includes(ui.dock) || !["full", "compact", "narrow"].includes(ui.menuWidth) || !object(settings.presets) || !object(settings.presets.custom)) {
      throw new TypeError("Basic Browse settings are invalid");
    }
    for (const list of [
      filters.genders,
      filters.locations,
      filters.relationships,
      filters.roles,
      filters.scopes
    ]) {
      if (!Array.isArray(list) || list.some((item) => typeof item !== "string")) {
        throw new TypeError("Basic filter selections must be string arrays");
      }
    }
    if (!object(filters.minimumContent) || Object.values(filters.minimumContent).some(
      (count) => count !== null && (!Number.isInteger(count) || count < 0 || count > 9999)
    )) {
      throw new TypeError("Basic minimum content filters are invalid");
    }
    for (const list of [filters.terms.exclude, filters.terms.include, filters.terms.limit]) {
      if (!Array.isArray(list) || list.some((item) => typeof item !== "string" || !item.trim())) {
        throw new TypeError("Basic terms must be non-empty strings");
      }
    }
    if (!object(filters.terms.history)) throw new TypeError("Basic term history is invalid");
    for (const list of Object.values(filters.terms.history)) {
      if (!Array.isArray(list) || list.some((item) => typeof item !== "string" || !item.trim())) {
        throw new TypeError("Basic term history must contain non-empty strings");
      }
    }
    if (!object(navigation.shortcuts) || !object(pageEnhancements)) {
      throw new TypeError("Basic navigation and enhancements are invalid");
    }
    return settings;
  }
  function saveTerms(settings, kind, terms) {
    if (!["exclude", "include", "limit"].includes(kind)) throw new TypeError("Unknown term kind");
    const clean = [...new Set(terms.map((term) => String(term).trim()).filter(Boolean))];
    settings.filters.terms[kind] = clean;
    settings.filters.terms.history[kind] = [
      .../* @__PURE__ */ new Set([...settings.filters.terms.history[kind], ...clean])
    ];
  }
  function forgetTerm(settings, kind, term) {
    settings.filters.terms[kind] = settings.filters.terms[kind].filter((item) => item !== term);
    settings.filters.terms.history[kind] = settings.filters.terms.history[kind].filter(
      (item) => item !== term
    );
  }
  function applyPreset(current, presetName, custom = {}) {
    const source = BUILT_IN_PRESETS[presetName] ?? custom[presetName];
    if (!source || !object(source)) throw new TypeError("Unknown Basic preset");
    const next = merge(normalizeBasicSettings(current), source);
    next.preset = presetName;
    return normalizeBasicSettings(next);
  }
  function saveCustomPreset(settings, name) {
    const cleanName = customPresetName(name);
    const normalized = normalizeBasicSettings(settings);
    const policy = clone(normalized);
    delete policy.presets;
    policy.preset = cleanName;
    normalized.presets.custom[cleanName] = policy;
    normalized.preset = cleanName;
    return normalized;
  }
  function renameCustomPreset(settings, currentName, nextName) {
    const normalized = normalizeBasicSettings(settings);
    const cleanName = customPresetName(nextName);
    if (!(currentName in normalized.presets.custom)) throw new TypeError("Unknown custom preset");
    if (cleanName !== currentName && cleanName in normalized.presets.custom) {
      throw new TypeError("Custom preset name already exists");
    }
    const policy = normalized.presets.custom[currentName];
    delete normalized.presets.custom[currentName];
    policy.preset = cleanName;
    normalized.presets.custom[cleanName] = policy;
    if (normalized.preset === currentName) normalized.preset = cleanName;
    return normalized;
  }
  function deleteCustomPreset(settings, name) {
    const normalized = normalizeBasicSettings(settings);
    if (!(name in normalized.presets.custom)) throw new TypeError("Unknown custom preset");
    delete normalized.presets.custom[name];
    if (normalized.preset === name) return applyPreset(normalized, "default");
    return normalized;
  }
  function customPresetName(name) {
    const cleanName = String(name ?? "").trim();
    if (!/^[\p{L}\p{N}][\p{L}\p{N} _-]{0,39}$/u.test(cleanName) || cleanName in BUILT_IN_PRESETS) {
      throw new TypeError("Custom preset name is invalid or reserved");
    }
    return cleanName;
  }

  // ../fl-tools-core/src/errors.js
  var CoreError = class extends Error {
    constructor(message, options = {}) {
      super(message, options);
      this.name = new.target.name;
      this.code = options.code ?? "CORE_ERROR";
      this.details = options.details;
    }
  };
  var ContractError = class extends CoreError {
    constructor(message, details) {
      super(message, { code: "CONTRACT_ERROR", details });
    }
  };
  var LifecycleError = class extends CoreError {
    constructor(message, details) {
      super(message, { code: "LIFECYCLE_ERROR", details });
    }
  };
  var SchedulerError = class extends CoreError {
    constructor(message, details) {
      super(message, { code: "SCHEDULER_ERROR", details });
    }
  };
  var CompatibilityError = class extends CoreError {
    constructor(message, details) {
      super(message, { code: "COMPATIBILITY_ERROR", details });
    }
  };
  var StorageError = class extends CoreError {
    constructor(message, { code = "STORAGE_ERROR", details, cause } = {}) {
      super(message, { code, details, cause });
    }
  };
  var StorageConflictError = class extends StorageError {
    constructor(message, details) {
      super(message, { code: "STORAGE_CONFLICT", details });
    }
  };

  // ../fl-tools-core/src/cross-tab/coordinator.js
  var PROTOCOL = "fl-tools/core-cross-tab/1";
  var MAX_PAYLOAD_NODES = 200;
  var MAX_PAYLOAD_CHARACTERS = 16e3;
  var FORBIDDEN_KEYS = /* @__PURE__ */ new Set(["__proto__", "constructor", "prototype"]);
  function isSmallSafePayload(root) {
    let characters = 0;
    let nodes = 0;
    const stack = [{ depth: 0, value: root }];
    while (stack.length) {
      const { depth, value } = stack.pop();
      nodes += 1;
      if (nodes > MAX_PAYLOAD_NODES || depth > 8) return false;
      if (value === null || value === void 0 || typeof value === "boolean") continue;
      if (typeof value === "number") {
        if (!Number.isFinite(value)) return false;
        continue;
      }
      if (typeof value === "string") {
        characters += value.length;
        if (characters > MAX_PAYLOAD_CHARACTERS) return false;
        continue;
      }
      if (typeof value !== "object") return false;
      const keys = Object.keys(value);
      for (const key of keys) {
        if (FORBIDDEN_KEYS.has(key) || key.length > 80) return false;
        characters += key.length;
        stack.push({ depth: depth + 1, value: value[key] });
      }
    }
    return characters <= MAX_PAYLOAD_CHARACTERS;
  }
  function defaultId() {
    return crypto.randomUUID();
  }
  var CrossTabCoordinator = class {
    #channel;
    #channelFactory;
    #eventBus;
    #getAccountId;
    #idFactory;
    #maxSeen;
    #seen = /* @__PURE__ */ new Set();
    #seenOrder = [];
    #sourceId;
    #started = false;
    constructor({
      eventBus,
      getAccountId,
      channelFactory = (name) => new BroadcastChannel(name),
      idFactory = defaultId,
      maxSeen = 1e3
    }) {
      if (!eventBus || typeof getAccountId !== "function" || typeof channelFactory !== "function") {
        throw new ContractError("Cross-tab coordinator dependencies are required");
      }
      this.#eventBus = eventBus;
      this.#getAccountId = getAccountId;
      this.#channelFactory = channelFactory;
      this.#idFactory = idFactory;
      this.#maxSeen = maxSeen;
      this.#sourceId = idFactory();
    }
    start() {
      if (this.#started) return;
      this.#channel = this.#channelFactory("fl-tools-core");
      this.#channel.addEventListener("message", this.#onMessage);
      this.#started = true;
    }
    publish(type, payload, { scope = "account" } = {}) {
      if (!this.#started) throw new ContractError("Cross-tab coordinator is not started");
      if (typeof type !== "string" || type.length === 0)
        throw new ContractError("Message type is required");
      if (!["account", "core"].includes(scope)) throw new ContractError("Invalid message scope");
      if (!isSmallSafePayload(payload)) {
        throw new ContractError("Cross-tab payload must be small and structurally safe");
      }
      const accountId = scope === "account" ? this.#getAccountId() : null;
      if (scope === "account" && !accountId) {
        throw new ContractError("Account-scoped message requires an unambiguous account");
      }
      const envelope = Object.freeze({
        accountId,
        messageId: this.#idFactory(),
        payload,
        protocol: PROTOCOL,
        scope,
        sourceId: this.#sourceId,
        type
      });
      this.#remember(envelope.messageId);
      this.#channel.postMessage(envelope);
      return envelope.messageId;
    }
    stop() {
      if (!this.#started) return;
      this.#channel.removeEventListener("message", this.#onMessage);
      this.#channel.close();
      this.#channel = void 0;
      this.#started = false;
      this.#seen.clear();
      this.#seenOrder = [];
    }
    #onMessage = ({ data }) => {
      if (!this.#isValid(data) || data.sourceId === this.#sourceId || this.#seen.has(data.messageId))
        return;
      if (data.scope === "account") {
        const currentAccountId = this.#getAccountId();
        if (!currentAccountId || data.accountId !== currentAccountId) return;
      }
      this.#remember(data.messageId);
      this.#eventBus.emit(`cross-tab:${data.type}`, data);
    };
    #isValid(data) {
      return data && typeof data === "object" && !Array.isArray(data) && Object.keys(data).length === 7 && data.protocol === PROTOCOL && typeof data.messageId === "string" && data.messageId.length > 0 && data.messageId.length <= 200 && typeof data.sourceId === "string" && data.sourceId.length > 0 && data.sourceId.length <= 200 && typeof data.type === "string" && data.type.length > 0 && data.type.length <= 80 && ["account", "core"].includes(data.scope) && (data.scope === "account" ? typeof data.accountId === "string" && data.accountId.length > 0 && data.accountId.length <= 200 : data.accountId === null) && isSmallSafePayload(data.payload);
    }
    #remember(messageId) {
      this.#seen.add(messageId);
      this.#seenOrder.push(messageId);
      while (this.#seenOrder.length > this.#maxSeen) {
        this.#seen.delete(this.#seenOrder.shift());
      }
    }
  };

  // ../fl-tools-core/src/events/event-bus.js
  var EventBus = class {
    #listeners = /* @__PURE__ */ new Map();
    #onListenerError;
    #destroyed = false;
    constructor({ onListenerError = () => {
    } } = {}) {
      if (typeof onListenerError !== "function") {
        throw new ContractError("onListenerError must be a function");
      }
      this.#onListenerError = onListenerError;
    }
    on(type, listener, { signal, once = false } = {}) {
      this.#assertActive();
      if (typeof type !== "string" || type.length === 0 || typeof listener !== "function") {
        throw new ContractError("Event type and listener are required");
      }
      if (signal?.aborted) return () => {
      };
      const entry = { listener, once };
      const listeners = this.#listeners.get(type) ?? /* @__PURE__ */ new Set();
      listeners.add(entry);
      this.#listeners.set(type, listeners);
      const off = () => {
        listeners.delete(entry);
        if (listeners.size === 0) this.#listeners.delete(type);
        signal?.removeEventListener("abort", off);
      };
      signal?.addEventListener("abort", off, { once: true });
      return off;
    }
    emit(type, payload) {
      this.#assertActive();
      const listeners = [...this.#listeners.get(type) ?? []];
      for (const entry of listeners) {
        if (entry.once) this.#listeners.get(type)?.delete(entry);
        try {
          entry.listener(payload);
        } catch (error) {
          this.#onListenerError(error, { type, payload });
        }
      }
      if (this.#listeners.get(type)?.size === 0) this.#listeners.delete(type);
      return listeners.length;
    }
    async emitAsync(type, payload) {
      this.#assertActive();
      const listeners = [...this.#listeners.get(type) ?? []];
      const results = [];
      for (const entry of listeners) {
        if (entry.once) this.#listeners.get(type)?.delete(entry);
        try {
          results.push(await entry.listener(payload));
        } catch (error) {
          this.#onListenerError(error, { type, payload });
          results.push(void 0);
        }
      }
      if (this.#listeners.get(type)?.size === 0) this.#listeners.delete(type);
      return results;
    }
    clear(type) {
      if (type === void 0) this.#listeners.clear();
      else this.#listeners.delete(type);
    }
    destroy() {
      this.clear();
      this.#destroyed = true;
    }
    #assertActive() {
      if (this.#destroyed) throw new ContractError("Event bus has been destroyed");
    }
  };

  // ../fl-tools-core/src/fetlife/terminology.js
  var GENDER_REFERENCE = Object.freeze(
    [
      {
        code: "AG",
        label: "Agender",
        url: "https://fetlife.com/kinktionary/genders/agender-9paeu",
        group: "Profile abbreviations"
      },
      {
        code: "Andro",
        label: "Androgyne",
        url: "https://fetlife.com/kinktionary/genders/androgyne-ousdc",
        group: "Profile abbreviations"
      },
      {
        code: "B",
        label: "Butch",
        url: "https://fetlife.com/kinktionary/genders/butch-jix2o",
        group: "Profile abbreviations"
      },
      {
        code: "BG",
        label: "Bigender",
        url: "https://fetlife.com/kinktionary/genders/bigender-ch12t",
        group: "Profile abbreviations"
      },
      {
        code: "CD/TV",
        label: "Crossdresser/Transvestite",
        url: "https://fetlife.com/kinktionary/genders/crossdresser-transvestite-clju6",
        group: "Profile abbreviations"
      },
      {
        code: "Cis",
        label: "Cisgender",
        url: "https://fetlife.com/kinktionary/genders/cisgender-n0ui6",
        group: "Profile abbreviations"
      },
      {
        code: "Db",
        label: "Demiboy",
        url: "https://fetlife.com/kinktionary/genders/demiboy-tdlym",
        group: "Profile abbreviations"
      },
      {
        code: "Dg",
        label: "Demigirl",
        url: "https://fetlife.com/kinktionary/genders/demigirl-nrjk5",
        group: "Profile abbreviations"
      },
      {
        code: "DemiG",
        label: "Demigender",
        url: "https://fetlife.com/kinktionary/genders/demigender-xeytu",
        group: "Profile abbreviations"
      },
      {
        code: "DW",
        label: "Demiwoman",
        url: "https://fetlife.com/kinktionary/genders/demiwoman-vgesu",
        group: "Profile abbreviations"
      },
      {
        code: "F",
        label: "Female",
        url: "https://fetlife.com/kinktionary/genders/female-o2wgm",
        group: "Profile abbreviations"
      },
      {
        code: "FEM",
        label: "Femme",
        url: "https://fetlife.com/kinktionary/genders/femme-6varq",
        group: "Profile abbreviations"
      },
      {
        code: "FtM",
        label: "Transgender \u2014 Female to Male",
        url: "https://fetlife.com/kinktionary/genders/transgender-rdynh",
        group: "Profile abbreviations"
      },
      {
        code: "GF",
        label: "Gender Fluid",
        url: "https://fetlife.com/kinktionary/genders/genderfluid-kuh3n",
        group: "Profile abbreviations"
      },
      {
        code: "GN",
        label: "Gender Neutral",
        url: "https://fetlife.com/kinktionary/genders/gender-neutral-2vpn5",
        group: "Profile abbreviations"
      },
      {
        code: "GNC",
        label: "Gender Non-Conforming",
        url: "https://fetlife.com/kinktionary/genders/gender-non-conforming-t9cwr",
        group: "Profile abbreviations"
      },
      {
        code: "GQ",
        label: "Gender Queer",
        url: "https://fetlife.com/kinktionary/genders/genderqueer-m2div",
        group: "Profile abbreviations"
      },
      {
        code: "IS",
        label: "Intersex",
        url: "https://fetlife.com/kinktionary/genders/intersex-ngt00",
        group: "Profile abbreviations"
      },
      {
        code: "M",
        label: "Male",
        url: "https://fetlife.com/kinktionary/genders/male-6sbc1",
        group: "Profile abbreviations"
      },
      {
        code: "Masc",
        label: "Masculine",
        url: "https://fetlife.com/kinktionary/genders/masc-jh6wm",
        group: "Profile abbreviations"
      },
      {
        code: "MtF",
        label: "Transgender \u2014 Male to Female",
        url: "https://fetlife.com/kinktionary/genders/transgender-rdynh",
        group: "Profile abbreviations"
      },
      {
        code: "NB",
        label: "Non Binary",
        url: "https://fetlife.com/kinktionary/genders/non-binary-msypz",
        group: "Profile abbreviations"
      },
      {
        code: "PG",
        label: "Pangender",
        url: "https://fetlife.com/kinktionary/genders/pangender-f7f1s",
        group: "Profile abbreviations"
      },
      {
        code: "QG",
        label: "Questioning",
        url: "https://fetlife.com/kinktionary/genders/questioning-cldkw",
        group: "Profile abbreviations"
      },
      {
        code: "TG",
        label: "Transgender",
        url: "https://fetlife.com/kinktionary/genders/transgender-rdynh",
        group: "Profile abbreviations"
      },
      {
        code: "TM",
        label: "Trans Man",
        url: "https://fetlife.com/kinktionary/genders/trans-man-dxknw",
        group: "Profile abbreviations"
      },
      {
        code: "TW",
        label: "Trans Woman",
        url: "https://fetlife.com/kinktionary/genders/trans-woman-t5uh2",
        group: "Profile abbreviations"
      },
      {
        code: "TwoS",
        label: "Two-Spirit",
        url: "https://fetlife.com/kinktionary/genders/two-spirit-nh2iv",
        group: "Profile abbreviations"
      },
      {
        code: "UoG",
        label: "Unsure",
        url: "https://fetlife.com/kinktionary/genders/unsure-gweck",
        group: "Profile abbreviations"
      },
      {
        code: "W",
        label: "Woman",
        url: "https://fetlife.com/kinktionary/genders/woman-2ey4z",
        group: "Profile abbreviations"
      },
      {
        code: "TS",
        label: "TransSexual",
        url: "https://fetlife.com/kinktionary/genders/transsexual-9rpmw",
        group: "Other shorthand"
      },
      {
        code: "TV",
        label: "Transvestite",
        url: "https://fetlife.com/kinktionary/genders/crossdresser-transvestite-clju6",
        group: "Other shorthand"
      }
    ].map(Object.freeze)
  );
  var ABBREVIATION_REFERENCE = Object.freeze(
    [
      {
        code: "ABDL",
        meanings: ["adult baby diaper lover"],
        sources: []
      },
      {
        code: "ABF",
        meanings: ["Adult Breastfeeding"],
        sources: []
      },
      {
        code: "ANR",
        meanings: ["Adult Nursing Relationship"],
        sources: []
      },
      {
        code: "BBBJ",
        meanings: [
          "Bareback Blowjob - Oral sex without the use of a protective barrier (e.g: a condom)."
        ],
        sources: [
          {
            label: "Blowjob",
            url: "https://fetlife.com/kinktionary/sexual-activities/blowjob-qk6hw"
          }
        ]
      },
      {
        code: "BD",
        meanings: ["Bondage & Discipline"],
        sources: [
          {
            label: "Bondage",
            url: "https://fetlife.com/kinktionary/kink-activities/bondage-v8vic"
          },
          {
            label: "Discipline",
            url: "https://fetlife.com/kinktionary/discipline-wkhpk"
          }
        ]
      },
      {
        code: "CBT",
        meanings: ["Cock and Ball Torture"],
        sources: [
          {
            label: "Cock and Ball Torture",
            url: "https://fetlife.com/kinktionary/kink-activities/cock-ball-torture-xi7nd"
          }
        ]
      },
      {
        code: "CEI",
        meanings: [
          "Cum Eating Instructions - Instructions given by a dominant partner to direct a submissive to consume semen."
        ],
        sources: []
      },
      {
        code: "CFNM",
        meanings: ["Clothed Female Naked/Nude Male - one-sided nudity"],
        sources: [
          {
            label: "one-sided nudity",
            url: "https://fetlife.com/kinktionary/kink-activities/one-sided-nudity-wvlvn"
          }
        ]
      },
      {
        code: "CIM",
        meanings: ["Cum In Mouth (ejaculating into a partner's mouth)"],
        sources: []
      },
      {
        code: "CMNF",
        meanings: ["Clothed Male Naked/Nude Female - one-sided nudity"],
        sources: [
          {
            label: "one-sided nudity",
            url: "https://fetlife.com/kinktionary/kink-activities/one-sided-nudity-wvlvn"
          }
        ]
      },
      {
        code: "CNC",
        meanings: ["Consensual Non-Consent"],
        sources: [
          {
            label: "Consensual Non-Consent",
            url: "https://fetlife.com/kinktionary/kink-activities/consensual-non-consent-vhsts"
          }
        ]
      },
      {
        code: "DD/bg",
        meanings: ["Daddy / babygirl - not age play related"],
        sources: [
          {
            label: "Daddy",
            url: "https://fetlife.com/kinktionary/roles/daddy-yuduq"
          },
          {
            label: "babygirl",
            url: "https://fetlife.com/kinktionary/roles/babygirl-miwjc"
          }
        ]
      },
      {
        code: "DD/lg",
        meanings: ["Daddy / little girl usually referring to ageplayer roles."],
        sources: [
          {
            label: "Daddy",
            url: "https://fetlife.com/kinktionary/roles/daddy-yuduq"
          },
          {
            label: "little",
            url: "https://fetlife.com/kinktionary/roles/little-azjvs"
          },
          {
            label: "ageplayer",
            url: "https://fetlife.com/kinktionary/roles/ageplayer-e3jup"
          }
        ]
      },
      {
        code: "D/s",
        meanings: ["Dominance/submission"],
        sources: [
          {
            label: "Dominance",
            url: "https://fetlife.com/kinktionary/kink-activities/dominance-0nzrh"
          },
          {
            label: "submission",
            url: "https://fetlife.com/kinktionary/kink-activities/submission-kvdbr"
          }
        ]
      },
      {
        code: "DID",
        meanings: [
          "Damsel In Distress(not to be confused with Dissociative Identity Disorder; extremely context-dependent)"
        ],
        sources: [
          {
            label: "Damsel In Distress",
            url: "https://fetlife.com/kinktionary/roles/damsel-in-distress-cc833"
          },
          {
            label: "Dissociative Identity Disorder",
            url: "https://fetlife.com/kinktionary/mental-health/conditions-disorders/dissociative-identity-disorder-did-6cb6a"
          }
        ]
      },
      {
        code: "FLR",
        meanings: ["Female Lead Relationship"],
        sources: [
          {
            label: "Female Lead Relationship",
            url: "https://fetlife.com/kinktionary/relationships/female-lead-relationship-8h8hm"
          }
        ]
      },
      {
        code: "HFO",
        meanings: ["Hands Free Orgasm"],
        sources: [
          {
            label: "Hands Free Orgasm",
            url: "https://fetlife.com/kinktionary/sexual-activities/orgasm-play-vgenu"
          }
        ]
      },
      {
        code: "JOI",
        meanings: ["Jerk Off Instructions"],
        sources: [
          {
            label: "\xA0Jerk Off Instructions",
            url: "https://fetlife.com/kinktionary/sexual-activities/jerk-off-instructions-jphn8"
          }
        ]
      },
      {
        code: "M/s",
        meanings: ["Master/slave or Mistress/slave"],
        sources: [
          {
            label: "Master",
            url: "https://fetlife.com/kinktionary/roles/master-xskgn"
          },
          {
            label: "slave",
            url: "https://fetlife.com/kinktionary/roles/slave-5itrm"
          },
          {
            label: "Mistress",
            url: "https://fetlife.com/kinktionary/roles/mistress-oh9yd"
          },
          {
            label: "slave",
            url: "https://fetlife.com/kinktionary/roles/slave-5itrm"
          }
        ]
      },
      {
        code: "OTK",
        meanings: ["Over The Knee Spanking"],
        sources: [
          {
            label: "Spanking",
            url: "https://fetlife.com/kinktionary/kink-activities/spanking-uxjlr"
          }
        ]
      },
      {
        code: "OWO",
        meanings: [
          "Oral Without Condom - Usually indicates a preference for a blow job without the use of a condom for protection"
        ],
        sources: []
      },
      {
        code: "Painal",
        meanings: ["Painful Anal Sex"],
        sources: [
          {
            label: "Painful Anal Sex",
            url: "https://fetlife.com/kinktionary/sexual-activities/anal-sex-utlkj"
          }
        ]
      },
      {
        code: "PNP",
        meanings: ["Party & Play"],
        sources: [
          {
            label: "Party & Play",
            url: "https://fetlife.com/kinktionary/sexual-activities/party-play-xtt5u"
          }
        ]
      },
      {
        code: "SM",
        meanings: ["Sado-Masochism"],
        sources: [
          {
            label: "Sado-Masochism",
            url: "https://fetlife.com/kinktionary/kink-activities/sadomasochism-935p2"
          }
        ]
      },
      {
        code: "SPH",
        meanings: ["Small Penis Humiliation"],
        sources: [
          {
            label: "Small Penis Humiliation",
            url: "https://fetlife.com/kinktionary/kink-activities/small-penis-humiliation-sph-j3xeo"
          }
        ]
      },
      {
        code: "WAM",
        meanings: ["Wet and Messy"],
        sources: [
          {
            label: "Wet and Messy",
            url: "https://fetlife.com/kinktionary/kink-activities/wet-and-messy-wam-oi4dk"
          }
        ]
      },
      {
        code: "Ace",
        meanings: ["Asexual"],
        sources: [
          {
            label: "Asexual",
            url: "https://fetlife.com/kinktionary/sexual-orientations/asexual-59lzh"
          }
        ]
      },
      {
        code: "Aro",
        meanings: ["Aromantic"],
        sources: [
          {
            label: "Aromantic",
            url: "https://fetlife.com/kinktionary/romantic-orientations/aromantic-mshux"
          }
        ]
      },
      {
        code: "Aroace or Aro/Ace",
        meanings: ["Asexual and Aromantic"],
        sources: [
          {
            label: "Asexual",
            url: "https://fetlife.com/kinktionary/sexual-orientations/asexual-59lzh"
          },
          {
            label: "Aromantic",
            url: "https://fetlife.com/kinktionary/romantic-orientations/aromantic-mshux"
          }
        ]
      },
      {
        code: "BBC",
        meanings: [
          "Big Black Cock - Usually refers to an above-average cock belonging to anyone who is black."
        ],
        sources: []
      },
      {
        code: "BBW",
        meanings: ["Big Beautiful Woman - A beautiful woman with a large figure."],
        sources: []
      },
      {
        code: "SSBBW",
        meanings: [
          "Supersized Big Beautiful Woman - A beautiful woman with an exceptionally large figure, often considered to be over 350 pounds."
        ],
        sources: []
      },
      {
        code: "BBP",
        meanings: ["Big Beautiful Person - A beautiful person with a large figure."],
        sources: []
      },
      {
        code: "BHC/BSC",
        meanings: [
          "Big Hispanic Cock - Usually refers to an above-average cock belonging to anyone that is Hispanic/Spanish."
        ],
        sources: []
      },
      {
        code: "BHM",
        meanings: ["Big Handsome Man - A handsome man with a large figure."],
        sources: []
      },
      {
        code: "BWC",
        meanings: [
          "Big White Cock - Usually referring to an above- average cock belonging to anyone that is caucasian."
        ],
        sources: []
      },
      {
        code: "Enby",
        meanings: ["Non-binary - (the phonetic spelling of N B)"],
        sources: [
          {
            label: "Non-binary",
            url: "https://fetlife.com/kinktionary/genders/non-binary-msypz"
          }
        ]
      },
      {
        code: "FBB",
        meanings: ["Female Body Builder"],
        sources: []
      },
      {
        code: "FLINTA",
        meanings: ["Female, Lesbian, Intersex, Non-binary, Trans & Agender."],
        sources: []
      },
      {
        code: "GGG",
        meanings: [
          "Good, Giving and Game - A person who is an experienced, selfless lover and welcomes new sexual experiences",
          "Good, Giving, and Game. Good in bed, Giving equal time and equal pleasure, and Game for anything\u2014 within reason. The term was coined in 2004, by Dan Savage, an LGBTQ+ activist."
        ],
        sources: []
      },
      {
        code: "NB",
        meanings: ["Non-Black or Non-Binary"],
        sources: [
          {
            label: "Non-Binary",
            url: "https://fetlife.com/kinktionary/genders/non-binary-msypz"
          }
        ]
      },
      {
        code: "PAWG",
        meanings: ["Phat Ass White Girl - A white woman with a large, curvy butt."],
        sources: []
      },
      {
        code: "TP",
        meanings: [
          "Tight Pussy - A vagina with well toned internal muscles that feels tight when inserted into."
        ],
        sources: []
      },
      {
        code: "TWD",
        meanings: [
          "Thick White Dick - A fetish category on FetLife emphasizing penis girth and a white male body."
        ],
        sources: []
      },
      {
        code: "ASL",
        meanings: [
          "Age Sex Location - Used in dating to ask for the age, sex and location of a person. More commonly used as an abbreviation for American Sign Language"
        ],
        sources: [
          {
            label: "American Sign Language",
            url: "https://en.wikipedia.org/wiki/American_Sign_Language"
          }
        ]
      },
      {
        code: "DILF",
        meanings: ["Dad I'd Like to Fuck - An attractive older man, usually a father."],
        sources: []
      },
      {
        code: "DTR",
        meanings: [
          "Define the Relationship - It's an initiated conversation with your partner(s) to agree on what type of relationship you want together."
        ],
        sources: []
      },
      {
        code: "D2F / DTF",
        meanings: ["Down To Fuck - Interested in having sex."],
        sources: []
      },
      {
        code: "ENM",
        meanings: ["Ethical Non-Monogamy"],
        sources: [
          {
            label: "Ethical Non-Monogamy",
            url: "https://fetlife.com/kinktionary/relationships/ethical-non-monogamy-mbwtf"
          }
        ]
      },
      {
        code: "FWB",
        meanings: [
          "Friend(s) With Benefits - A friendly relationship, as opposed to a romantic one, that involves sex. Emotional connections are specifically on a friendly level, and romance is usually neither expected, nor even desired."
        ],
        sources: []
      },
      {
        code: "LDD",
        meanings: ["Long Distance Dynamic"],
        sources: [
          {
            label: "Long Distance Dynamic",
            url: "https://fetlife.com/kinktionary/relationships/long-distance-dynamic-nblf2"
          }
        ]
      },
      {
        code: "LDR",
        meanings: ["Long Distance Relationship"],
        sources: [
          {
            label: "Long Distance Relationship",
            url: "https://fetlife.com/kinktionary/relationships/long-distance-relationship-kc5xr"
          }
        ]
      },
      {
        code: "MBL",
        meanings: [
          "Married But Looking - The person is married but is looking for other relationships"
        ],
        sources: []
      },
      {
        code: "MILF",
        meanings: ["Mother I'd Like to Fuck - An attractive older woman, usually a mother."],
        sources: []
      },
      {
        code: "NSA",
        meanings: [
          "No Strings Attached - Interested in sex without requiring a relationship, or potentially even any connection afterward. Potentially a one-night stand, or longer-term with no expectations of romance or relationships."
        ],
        sources: []
      },
      {
        code: "PILF",
        meanings: [
          "Parent I'd Like to Fuck - An attractive older person of any gender, usually a parent."
        ],
        sources: []
      },
      {
        code: "QPP",
        meanings: ["Queer Platonic Partner"],
        sources: [
          {
            label: "Queer Platonic Partner",
            url: "https://fetlife.com/kinktionary/relationships/queer-platonic-partner-vic6o"
          }
        ]
      },
      {
        code: "RA",
        meanings: ["Relationship Anarchy"],
        sources: [
          {
            label: "Relationship Anarchy",
            url: "https://fetlife.com/kinktionary/relationships/relationship-anarchist-ftkp9"
          }
        ]
      },
      {
        code: "TPE",
        meanings: ["Total Power Exchange"],
        sources: [
          {
            label: "Power Exchange",
            url: "https://fetlife.com/kinktionary/kink-activities/power-exchange-qvqbs"
          }
        ]
      },
      {
        code: "PPE",
        meanings: ["Partial Power Exchange"],
        sources: [
          {
            label: "Power Exchange",
            url: "https://fetlife.com/kinktionary/kink-activities/power-exchange-qvqbs"
          }
        ]
      },
      {
        code: "NBLM",
        meanings: ["Non-binary loving men, also known as Toric"],
        sources: []
      },
      {
        code: "NBLW",
        meanings: ["Non-binary loving women, also known as Trixic"],
        sources: []
      },
      {
        code: "WLW",
        meanings: ["Woman loving women, also known as Sapphic"],
        sources: []
      },
      {
        code: "MLM",
        meanings: ["Man loving men, also known as Achillean"],
        sources: []
      },
      {
        code: "WLM",
        meanings: ["Woman loving men, also known as Julietian"],
        sources: []
      },
      {
        code: "MLW",
        meanings: ["Man loving women, also known as Romeric"],
        sources: []
      },
      {
        code: "CRISP",
        meanings: ["Considered Reversible Informed Specific Participatory. - A consent practice"],
        sources: [
          {
            label: "consent",
            url: "https://fetlife.com/kinktionary/scene-safety/consent-anjvl"
          }
        ]
      },
      {
        code: "FRIES",
        meanings: ["Freely given Reversible Informed Enthusiastic Specific. - A consent practice"],
        sources: [
          {
            label: "consent",
            url: "https://fetlife.com/kinktionary/scene-safety/consent-anjvl"
          }
        ]
      },
      {
        code: "PRICK",
        meanings: ["Personal Responsibility In Consensual Kink. - A consent practice"],
        sources: [
          {
            label: "consent",
            url: "https://fetlife.com/kinktionary/scene-safety/consent-anjvl"
          }
        ]
      },
      {
        code: "RACK",
        meanings: ["Risk Aware Consensual Kink - A consent practice"],
        sources: [
          {
            label: "consent",
            url: "https://fetlife.com/kinktionary/scene-safety/consent-anjvl"
          }
        ]
      },
      {
        code: "RASH",
        meanings: ["Risk Aware Shit Happens - A consent practice"],
        sources: [
          {
            label: "consent",
            url: "https://fetlife.com/kinktionary/scene-safety/consent-anjvl"
          }
        ]
      },
      {
        code: "RAVE",
        meanings: ["Risk Aware Virus Exposure - A consent practice"],
        sources: [
          {
            label: "consent",
            url: "https://fetlife.com/kinktionary/scene-safety/consent-anjvl"
          }
        ]
      },
      {
        code: "SSC",
        meanings: ["Safe Sane Consensual - A consent practice"],
        sources: [
          {
            label: "consent",
            url: "https://fetlife.com/kinktionary/scene-safety/consent-anjvl"
          }
        ]
      },
      {
        code: "SOP",
        meanings: ["Sex On Premises"],
        sources: []
      },
      {
        code: "WIITWD",
        meanings: [
          "What It Is That We Do. A mostly outdated, but still occasionally used term, to indicate the expanse of kinky activities in an attempt to be more inclusive than 'BDSM'. Occasionally referred to verbally as 'WIT-wood'"
        ],
        sources: []
      },
      {
        code: "YKINMK / YKINMKBYKIOK",
        meanings: [
          "Your Kink Is Not My Kink / Your Kink Is Not My Kink But Your Kink Is Okay. - A way of expressing disinterest in something without invalidating someone else's enjoyment of it."
        ],
        sources: []
      },
      {
        code: "NMIK",
        meanings: [
          "No Minors In Kink. Used as shorthand to indicate a profile/page/community is for over 18 adults only. Commonly used in ageplay and petplay communities, both of which are often confused for being appropriate for minors."
        ],
        sources: []
      },
      {
        code: "DFK",
        meanings: ["Deep French Kissing - Deep open mouth kissing."],
        sources: []
      },
      {
        code: "GFE",
        meanings: [
          "GirlFriend Experience - A service (often paid for) where someone agrees to act like a girlfriend without being in a relationship e.g: chat, cuddle, kiss."
        ],
        sources: []
      },
      {
        code: "PFP",
        meanings: ["Pay For Play"],
        sources: [
          {
            label: "Pay For Play",
            url: "https://fetlife.com/kinktionary/glossary/pay-for-play-sep1i"
          }
        ]
      },
      {
        code: "PPM",
        meanings: [
          "Pay Per Meet (frequently used for sugar relationships; it is expected that if you want to get together physically, it will involve a money exchange)"
        ],
        sources: []
      },
      {
        code: "PSE",
        meanings: [
          "Porn Star Experience - A service (often paid for) where someone agrees to be a very athletic and energetic sexual partner"
        ],
        sources: []
      },
      {
        code: "304",
        meanings: [
          "Hoe - When read upside down on a calculator 304 looks like the word 'hoe.' Used on certain platforms to bypass adult word filters."
        ],
        sources: []
      },
      {
        code: "BBL",
        meanings: [
          "(As a noun) Brazilian Butt Lift: a form of plastic surgery to aethetically enhance/repair the buttocks. (As a phrase) 'Be Back Later'."
        ],
        sources: []
      },
      {
        code: "D&DF / DDF",
        meanings: [
          "Drug and Disease Free - A person who has no sexually transmitted infections and doesn't consume recreational drugs."
        ],
        sources: []
      },
      {
        code: "F&P",
        meanings: [
          "On FetLife, this means Fresh & Pervy and represents one of the ways to explore the site."
        ],
        sources: [
          {
            label: "explore",
            url: "https://fetlife.com/explore"
          }
        ]
      },
      {
        code: "FOP",
        meanings: ["On FetLife, this means Fuck or Pass, a game that can be found in some groups"],
        sources: []
      },
      {
        code: "HMU",
        meanings: ["'Hit me up'. I.E. 'Message me.'"],
        sources: []
      },
      {
        code: "IRL",
        meanings: [
          "In Real Life. In the context of kink and BDSM, IRL is used to separate physical, offline, in-person experiences and dynamics from online chatting, virtual roleplay, or fantasies discussed on the internet"
        ],
        sources: []
      },
      {
        code: "ISO",
        meanings: ["In Search Of"],
        sources: []
      },
      {
        code: "K&P",
        meanings: [
          "On FetLife, this means Kinky & Popular and represents one of the ways to explore the site."
        ],
        sources: [
          {
            label: "explore",
            url: "https://fetlife.com/explore"
          }
        ]
      },
      {
        code: "NSFW",
        meanings: ["Not Safe for Work - not suitable for viewing in a professional environment"],
        sources: []
      },
      {
        code: "PUA",
        meanings: ["Pick-up Artist"],
        sources: []
      },
      {
        code: "PWA",
        meanings: [
          "Progressive Web App - the way to access FetLife from your phone if you don't want to use a browser"
        ],
        sources: []
      },
      {
        code: "SIG",
        meanings: [
          "Special Interest Group - A group of people who share a specific interest and come together based on that interest."
        ],
        sources: []
      },
      {
        code: "STI / STD",
        meanings: ["Sexually Transmitted Infection / Disease"],
        sources: [
          {
            label: "Sexually Transmitted Infection / Disease",
            url: "https://fetlife.com/kinktionary/sexual-health/stis-stds-kd75k"
          }
        ]
      }
    ].map(
      (entry) => Object.freeze({
        ...entry,
        meanings: Object.freeze(entry.meanings),
        sources: Object.freeze(entry.sources.map(Object.freeze))
      })
    )
  );

  // ../fl-tools-core/src/fetlife/feed-activity.js
  var FEED_ACTIVITY_CATEGORIES = Object.freeze({
    CONVERSATION: "conversation",
    POST: "post",
    REACTION: "reaction",
    SOCIAL: "social",
    UNKNOWN: "unknown"
  });
  var ACTIVITY_TYPE_ATTRIBUTES = Object.freeze(["data-feed-event", "data-story-type", "data-type"]);
  function normalizeType(value) {
    const normalized = String(value ?? "").trim().toLocaleLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
    return normalized || null;
  }
  function categoryForType(type) {
    if (!type) return FEED_ACTIVITY_CATEGORIES.UNKNOWN;
    if (/(?:^|_)(?:super)?loved?(?:_|$)|trending/.test(type)) {
      return FEED_ACTIVITY_CATEGORIES.REACTION;
    }
    if (/comment|repl(?:y|ied)|answered|response/.test(type)) {
      return FEED_ACTIVITY_CATEGORIES.CONVERSATION;
    }
    if (/friend|follow|sign_?up|relationship|profile_update|fetish|group_membership|became_group_leader|rsvp/.test(
      type
    )) {
      return FEED_ACTIVITY_CATEGORIES.SOCIAL;
    }
    if (/picture|video|writing|(?:^|_)post(?:_|$)|status|community_list|ask_me_anything|event|discussion/.test(
      type
    )) {
      return FEED_ACTIVITY_CATEGORIES.POST;
    }
    return FEED_ACTIVITY_CATEGORIES.UNKNOWN;
  }
  function summaryText(element) {
    const source = element.querySelector?.('[data-fltools-field="feed-summary"], header, h1, h2, h3') ?? element;
    return String(source?.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 600);
  }
  function categoryForSummary(summary) {
    if (!summary) return FEED_ACTIVITY_CATEGORIES.UNKNOWN;
    if (/\b(?:superloved|loved|trending)\b/i.test(summary)) {
      return FEED_ACTIVITY_CATEGORIES.REACTION;
    }
    if (/\b(?:commented on|replied to|answered)\b/i.test(summary)) {
      return FEED_ACTIVITY_CATEGORIES.CONVERSATION;
    }
    if (/\b(?:started following|is now following|followed|accepted (?:a )?friend|are now friends|signed up|joined fetlife|joined (?:a |the )?group|became (?:a )?(?:leader|owner)|relationship (?:update|change)|updated (?:their|a) profile|added (?:a )?fetish|rsvp(?:ed)?)\b/i.test(
      summary
    )) {
      return FEED_ACTIVITY_CATEGORIES.SOCIAL;
    }
    if (/\b(?:posted|uploaded|published|wrote|created)\b/i.test(summary)) {
      return FEED_ACTIVITY_CATEGORIES.POST;
    }
    return FEED_ACTIVITY_CATEGORIES.UNKNOWN;
  }
  function classifyFeedActivity(element, { contentType } = {}) {
    let activityType = null;
    for (const attribute of ACTIVITY_TYPE_ATTRIBUTES) {
      activityType = normalizeType(element.getAttribute?.(attribute));
      if (activityType) break;
    }
    const activityCategory = categoryForType(activityType);
    const summaryCategory = categoryForSummary(summaryText(element));
    const contentActivityType = normalizeType(element.getAttribute?.("data-dwell-content-type")) ?? normalizeType(contentType);
    const category = activityCategory !== FEED_ACTIVITY_CATEGORIES.UNKNOWN ? activityCategory : summaryCategory !== FEED_ACTIVITY_CATEGORIES.UNKNOWN ? summaryCategory : categoryForType(contentActivityType);
    const type = activityType ?? contentActivityType;
    return Object.freeze({ category, type });
  }

  // ../fl-tools-core/src/registries/component-registry.js
  var VALID_KINDS = /* @__PURE__ */ new Set(["feature", "module"]);
  function assertComponent(component, kind) {
    if (!component || typeof component !== "object")
      throw new ContractError(`${kind} must be an object`);
    if (typeof component.id !== "string" || !component.id.includes(".")) {
      throw new ContractError(`${kind} id must be a namespaced string`, { id: component.id });
    }
    if (typeof component.owner !== "string" || component.owner.length === 0) {
      throw new ContractError(`${kind} owner is required`, { id: component.id });
    }
    if (component.init !== void 0 && typeof component.init !== "function") {
      throw new ContractError(`${kind} init must be a function`, { id: component.id });
    }
    if (component.destroy !== void 0 && typeof component.destroy !== "function") {
      throw new ContractError(`${kind} destroy must be a function`, { id: component.id });
    }
    for (const field of ["permissions", "dependencies"]) {
      if (component[field] !== void 0 && !Array.isArray(component[field])) {
        throw new ContractError(`${kind} ${field} must be an array`, { id: component.id });
      }
    }
  }
  var ComponentRegistry = class {
    #components = /* @__PURE__ */ new Map();
    #kind;
    #locked = false;
    constructor(kind) {
      if (!VALID_KINDS.has(kind))
        throw new ContractError("Unknown component registry kind", { kind });
      this.#kind = kind;
    }
    register(component) {
      if (this.#locked) throw new ContractError(`${this.#kind} registry is locked`);
      assertComponent(component, this.#kind);
      if (this.#components.has(component.id)) {
        throw new ContractError(`Duplicate ${this.#kind} id`, { id: component.id });
      }
      const stored = Object.freeze({
        ...component,
        dependencies: Object.freeze([...component.dependencies ?? []]),
        permissions: Object.freeze([...component.permissions ?? []])
      });
      this.#components.set(stored.id, stored);
      return stored;
    }
    get(id) {
      return this.#components.get(id);
    }
    has(id) {
      return this.#components.has(id);
    }
    unregister(id) {
      if (this.#locked) throw new ContractError(`${this.#kind} registry is locked`);
      return this.#components.delete(id);
    }
    list({ owner } = {}) {
      return Object.freeze(
        [...this.#components.values()].filter((component) => !owner || component.owner === owner)
      );
    }
    validateDependencies() {
      for (const component of this.#components.values()) {
        for (const dependency of component.dependencies) {
          if (!this.#components.has(dependency)) {
            throw new ContractError(`Missing ${this.#kind} dependency`, {
              dependency,
              id: component.id
            });
          }
        }
      }
    }
    lock() {
      this.validateDependencies();
      this.#locked = true;
    }
  };

  // ../fl-tools-core/src/registries/action-registry.js
  var ACTION_ID = /^[a-z][a-z0-9-]*(?:\.[a-z][a-z0-9-]*)+$/;
  var ActionRegistry = class {
    #actions = /* @__PURE__ */ new Map();
    register({ handler, id, label, owner }) {
      if (!ACTION_ID.test(id ?? "") || !/^[a-z][a-z0-9-]*$/.test(owner ?? "") || !id.startsWith(`${owner}.`) || typeof label !== "string" || !label.trim() || typeof handler !== "function") {
        throw new ContractError("Action requires an owner-scoped id, label, and handler");
      }
      if (this.#actions.has(id)) throw new ContractError("Duplicate action id", { id });
      const action = Object.freeze({ handler, id, label: label.trim(), owner });
      this.#actions.set(id, action);
      return () => this.#actions.delete(id);
    }
    async invoke(id, payload) {
      const action = this.#actions.get(id);
      if (!action) throw new ContractError("Unknown action id", { id });
      return action.handler(payload);
    }
    list({ owner } = {}) {
      return Object.freeze(
        [...this.#actions.values()].filter((action) => !owner || action.owner === owner).map(
          ({ id, label, owner: actionOwner }) => Object.freeze({ id, label, owner: actionOwner })
        )
      );
    }
    removeOwner(owner) {
      let removed = 0;
      for (const [id, action] of this.#actions) {
        if (action.owner !== owner) continue;
        this.#actions.delete(id);
        removed += 1;
      }
      return removed;
    }
    clear() {
      this.#actions.clear();
    }
  };

  // ../fl-tools-core/src/registries/product-registry.js
  var import_semver = __toESM(require_semver2(), 1);
  var PRODUCT_TYPES = /* @__PURE__ */ new Set(["edition", "module"]);
  var PRODUCT_CHANNELS = /* @__PURE__ */ new Set(["stable", "beta", "development"]);
  function normalizeManifest(manifest) {
    if (!manifest || typeof manifest !== "object")
      throw new ContractError("Product manifest is required");
    const requiredStrings = ["id", "name", "type", "version", "channel", "coreCompatibility"];
    for (const field of requiredStrings) {
      if (typeof manifest[field] !== "string" || manifest[field].length === 0) {
        throw new ContractError(`Product manifest ${field} is required`);
      }
    }
    if (!PRODUCT_TYPES.has(manifest.type)) throw new ContractError("Invalid product type");
    if (!PRODUCT_CHANNELS.has(manifest.channel)) throw new ContractError("Invalid product channel");
    if (!(0, import_semver.valid)(manifest.version)) throw new ContractError("Invalid product version");
    if (!(0, import_semver.validRange)(manifest.coreCompatibility))
      throw new ContractError("Invalid Core compatibility range");
    for (const field of ["permissions", "features"]) {
      if (!Array.isArray(manifest[field]))
        throw new ContractError(`Product manifest ${field} is required`);
    }
    return Object.freeze({
      ...manifest,
      features: Object.freeze([...manifest.features]),
      permissions: Object.freeze([...manifest.permissions])
    });
  }
  var ProductRegistry = class {
    #coreVersion;
    #products = /* @__PURE__ */ new Map();
    constructor({ coreVersion }) {
      if (!(0, import_semver.valid)(coreVersion)) throw new ContractError("Core version must be valid SemVer");
      this.#coreVersion = coreVersion;
    }
    register(manifest) {
      const stored = normalizeManifest(manifest);
      if (this.#products.has(stored.id))
        throw new ContractError("Duplicate product id", { id: stored.id });
      if (!(0, import_semver.satisfies)(this.#coreVersion, stored.coreCompatibility)) {
        throw new CompatibilityError("Product is incompatible with the active Core", {
          coreVersion: this.#coreVersion,
          productId: stored.id,
          requiredRange: stored.coreCompatibility
        });
      }
      this.#products.set(stored.id, stored);
      return stored;
    }
    get(id) {
      return this.#products.get(id);
    }
    list() {
      return Object.freeze([...this.#products.values()]);
    }
    unregister(id) {
      return this.#products.delete(id);
    }
  };

  // ../fl-tools-core/src/fetlife/url.js
  var FETLIFE_HOST = /(^|\.)fetlife\.com$/i;
  function toUrl(value, baseUrl = "https://fetlife.com/") {
    if (value === void 0 || value === null || value === "") return null;
    try {
      return value instanceof URL ? new URL(value.href) : new URL(value, baseUrl);
    } catch {
      return null;
    }
  }
  function canonicalizeFetLifeUrl(value, baseUrl) {
    const url = toUrl(value, baseUrl);
    if (!url || url.protocol !== "https:" || !FETLIFE_HOST.test(url.hostname)) return null;
    url.hash = "";
    url.search = "";
    url.hostname = "fetlife.com";
    url.pathname = url.pathname.replace(/\/{2,}/g, "/").replace(/\/$/, "") || "/";
    return url.href;
  }

  // ../fl-tools-core/src/fetlife/routes.js
  var ROUTE_KINDS = Object.freeze({
    COMPOSER: "composer",
    CONTENT: "content",
    EVENT: "event",
    FEED: "feed",
    GROUP: "group",
    PROFILE: "profile",
    REFERENCE: "reference",
    SETTINGS: "settings",
    UNKNOWN: "unknown"
  });
  var CONTENT_PATTERNS = [
    {
      ownerParam: "ownerId",
      pattern: /^\/users\/(\d+)\/(posts|pictures|videos|statuses|writings)\/(\d+)(?:\/|$)/
    },
    {
      ownerParam: "ownerNickname",
      pattern: /^\/([^/]+)\/(posts|pictures|videos|statuses|writings)\/(\d+)(?:\/|$)/
    },
    { pattern: /^\/(posts|pictures|videos|statuses|writings)\/(\d+)(?:\/|$)/ }
  ];
  var FEED_PATHS = /* @__PURE__ */ new Set(["/home", "/writings"]);
  var RESERVED_ROOT_PATHS = /* @__PURE__ */ new Set([
    "bookmarks",
    "events",
    "explore",
    "fetishes",
    "groups",
    "home",
    "kinktionary",
    "p",
    "pictures",
    "posts",
    "requests",
    "settings",
    "users",
    "videos",
    "writings"
  ]);
  function result(kind, url, confidence, params = {}) {
    return Object.freeze({ confidence, kind, params: Object.freeze(params), url });
  }
  function detectRoute(value, baseUrl) {
    const parsed = toUrl(value, baseUrl);
    const canonicalUrl = canonicalizeFetLifeUrl(value, baseUrl);
    if (!parsed || !canonicalUrl) return result(ROUTE_KINDS.UNKNOWN, null, "low");
    const path = parsed.pathname.replace(/\/{2,}/g, "/");
    const reference = path.match(/^\/kinktionary(?:\/([^/]+))?\/?$/);
    if (reference) {
      return result(ROUTE_KINDS.REFERENCE, canonicalUrl, "medium", {
        view: "kinktionary",
        ...reference[1] ? { article: reference[1] } : {}
      });
    }
    for (const { pattern, ownerParam } of CONTENT_PATTERNS) {
      const match = path.match(pattern);
      if (match) {
        const hasOwner = Boolean(ownerParam);
        return result(ROUTE_KINDS.CONTENT, canonicalUrl, "high", {
          contentId: hasOwner ? match[3] : match[2],
          contentType: hasOwner ? match[2] : match[1],
          ...hasOwner ? { [ownerParam]: match[1] } : {}
        });
      }
    }
    const composer = path.match(/^\/(posts|pictures|videos)\/new\/?$/);
    if (composer) {
      return result(ROUTE_KINDS.COMPOSER, canonicalUrl, "medium", {
        contentType: composer[1] === "posts" ? "writings" : composer[1]
      });
    }
    const settings = path.match(/^\/settings\/(profile)\/?$/);
    if (settings) {
      return result(ROUTE_KINDS.SETTINGS, canonicalUrl, "medium", {
        section: settings[1]
      });
    }
    if (/^\/bookmarks\/?$/.test(path)) {
      return result(ROUTE_KINDS.FEED, canonicalUrl, "medium", { view: "bookmarks" });
    }
    const profile = path.match(/^\/users\/(\d+)(?:\/|$)/);
    if (profile) return result(ROUTE_KINDS.PROFILE, canonicalUrl, "high", { personId: profile[1] });
    const group = path.match(/^\/groups\/(\d+)(?:\/|$)/);
    if (group) return result(ROUTE_KINDS.GROUP, canonicalUrl, "high", { groupId: group[1] });
    if (/^\/groups\/?$/.test(path)) {
      return result(ROUTE_KINDS.GROUP, canonicalUrl, "medium", { view: "list" });
    }
    const event = path.match(/^\/events\/(\d+)\/?$/);
    if (event) return result(ROUTE_KINDS.EVENT, canonicalUrl, "high", { eventId: event[1] });
    const eventDetail = path.match(/^\/events\/(\d+)\/(\d+)(?:\/[^/]+)?\/?$/);
    if (eventDetail) {
      return result(ROUTE_KINDS.EVENT, canonicalUrl, "medium", {
        pathIds: Object.freeze([eventDetail[1], eventDetail[2]]),
        view: "detail"
      });
    }
    if (/^\/events(?:\/near)?\/?$/.test(path)) {
      return result(ROUTE_KINDS.EVENT, canonicalUrl, "medium", { view: "list" });
    }
    if (path === "/requests") {
      return result(ROUTE_KINDS.FEED, canonicalUrl, "medium", { view: "requests" });
    }
    const explore = path.match(/^\/explore(?:\/([^/]+))?(?:\/[^/]+)?\/?$/);
    if (explore) {
      const section2 = {
        following: "following",
        "fresh-and-pervy": "fresh-and-pervy",
        "stuff-you-love": "stuff-you-love"
      }[explore[1]] ?? "popular";
      return result(ROUTE_KINDS.FEED, canonicalUrl, "medium", {
        section: section2,
        view: "explore"
      });
    }
    const fetishes = path.match(/^\/fetishes(?:\/(most_popular))?\/?$/);
    if (fetishes) {
      return result(ROUTE_KINDS.FEED, canonicalUrl, "medium", {
        section: fetishes[1] ? "most-popular" : "all",
        view: "fetishes"
      });
    }
    if (/^\/p\/(?:[^/]+\/){1,3}kinksters\/?$/.test(path)) {
      return result(ROUTE_KINDS.PROFILE, canonicalUrl, "medium", {
        placeList: true,
        section: "kinksters"
      });
    }
    if (/^\/p\/?$/.test(path)) {
      return result(ROUTE_KINDS.FEED, canonicalUrl, "medium", {
        place: true,
        view: "list"
      });
    }
    if (/^\/p(?:\/[^/]+){1,4}\/?$/.test(path)) {
      return result(ROUTE_KINDS.FEED, canonicalUrl, "medium", {
        place: true,
        view: "detail"
      });
    }
    if (FEED_PATHS.has(path.replace(/\/$/, "") || "/") || /^\/(?:$|activity(?:\/|$)|explore(?:\/|$)|feed(?:\/|$))/.test(path)) {
      return result(ROUTE_KINDS.FEED, canonicalUrl, "medium");
    }
    const relationshipList = path.match(/^\/(friends|followers|following)\/?$/);
    if (relationshipList) {
      return result(ROUTE_KINDS.PROFILE, canonicalUrl, "high", {
        relationshipList: true,
        section: relationshipList[1]
      });
    }
    const rootSlug = path.match(/^\/([^/]+)\/?$/)?.[1];
    if (rootSlug && !RESERVED_ROOT_PATHS.has(rootSlug)) {
      return result(ROUTE_KINDS.PROFILE, canonicalUrl, "medium", { nickname: rootSlug });
    }
    const profileSection = path.match(
      /^\/([^/]+)\/(activity|pictures|videos|posts|l|friends|followers|following|profile\/groups)\/?$/
    );
    if (profileSection && !RESERVED_ROOT_PATHS.has(profileSection[1])) {
      return result(ROUTE_KINDS.PROFILE, canonicalUrl, "medium", {
        nickname: profileSection[1],
        section: profileSection[2]
      });
    }
    return result(ROUTE_KINDS.UNKNOWN, canonicalUrl, "low");
  }

  // ../fl-tools-core/src/fetlife/selectors.js
  function freezeList(values2) {
    return Object.freeze(values2);
  }
  var SELECTORS = Object.freeze({
    currentAccount: freezeList(["[data-nav--ama-toggle-user-id-value]"]),
    canonicalLink: freezeList(['link[rel="canonical"][href]']),
    candidateRoots: freezeList([
      "[data-fltools-fixture-kind]",
      "[data-member-card]",
      '[role="feed"]',
      "article",
      '[data-test-id="profile-header"]',
      '[data-clickable-url-value^="/events/"]',
      'h2 > a[href^="/groups/"]',
      "main[data-user-id]",
      "main[data-group-id]",
      "main[data-event-id]"
    ]),
    contentLink: freezeList([
      'a[href*="/posts/"]',
      'a[href*="/pictures/"]',
      'a[href*="/videos/"]',
      'a[href*="/statuses/"]',
      'a[href*="/writings/"]'
    ]),
    displayName: freezeList(['[data-fltools-field="display-name"]', "h1", "h2"]),
    eventLink: freezeList(['a[href^="/events/"]', 'a[href*="fetlife.com/events/"]']),
    groupLink: freezeList(['a[href^="/groups/"]', 'a[href*="fetlife.com/groups/"]']),
    profileLink: freezeList(['a[href*="/users/"]']),
    profileTag: freezeList([
      ".text-sm.font-bold.text-gray-300",
      '[data-test-id="profile-header"] h1 span.select-none.font-bold'
    ]),
    profileLocation: freezeList(['[data-test-id="profile-header"] h1 + p a[href^="/p/"]']),
    relationControl: freezeList([
      "turbo-frame[id^='relation_button'] button",
      "turbo-frame[id^='relation_button'] span.inline-flex"
    ]),
    followsYouMarker: freezeList(['path[d^="M12 1v2H0v2h12v2l4-3z"]']),
    title: freezeList(['[data-fltools-field="title"]', "h1", "h2", "h3"])
  });
  var CURRENT_ACCOUNT_ATTRIBUTE = "data-nav--ama-toggle-user-id-value";
  var CANDIDATE_ROOT_QUERY = SELECTORS.candidateRoots.join(",");
  function queryFirst(root, selectors) {
    for (const selector of selectors) {
      if (root.matches?.(selector)) return root;
      const found = root.querySelector?.(selector);
      if (found) return found;
    }
    return null;
  }
  function readText(root, selectors) {
    const element = queryFirst(root, selectors);
    const value = element?.textContent?.replace(/\s+/g, " ").trim();
    return value || null;
  }

  // ../fl-tools-core/src/fetlife/classify.js
  var CANDIDATE_KINDS = /* @__PURE__ */ new Set(["content", "event", "feed", "group", "profile"]);
  function classified(kind, confidence, evidence) {
    return Object.freeze({ confidence, evidence, kind });
  }
  function containsRoute(element, kind) {
    const anchors = [
      ...element.matches?.("a[href]") ? [element] : [],
      ...element.querySelectorAll?.("a[href]") ?? []
    ];
    return anchors.some(
      (anchor) => detectRoute(anchor.getAttribute("href"), element.ownerDocument?.URL).kind === kind
    );
  }
  function classifyElement(element, route) {
    const explicit = element.getAttribute?.("data-fltools-fixture-kind");
    if (CANDIDATE_KINDS.has(explicit)) return classified(explicit, "high", "fixture-kind");
    if (element.hasAttribute?.("data-content-id")) return classified("content", "high", "content-id");
    if (element.hasAttribute?.("data-story-uid")) return classified("content", "high", "story-uid");
    if (element.hasAttribute?.("data-event-id")) return classified("event", "high", "event-id");
    if (element.hasAttribute?.("data-group-id")) return classified("group", "high", "group-id");
    if (element.hasAttribute?.("data-user-id")) return classified("profile", "high", "user-id");
    if (element.hasAttribute?.("data-member-card")) {
      return classified("profile", "medium", "member-card");
    }
    if (element.getAttribute?.("data-test-id") === "profile-header") {
      return classified("profile", "high", "profile-header");
    }
    if (/^\/events\//.test(element.getAttribute?.("data-clickable-url-value") ?? "")) {
      return classified("event", "high", "event-click-target");
    }
    if (element.getAttribute?.("role") === "feed") return classified("feed", "high", "feed-role");
    if (element.matches?.("main")) {
      if (route?.kind === ROUTE_KINDS.PROFILE) return classified("profile", "high", "profile-route");
      if (route?.kind === ROUTE_KINDS.CONTENT) return classified("content", "high", "content-route");
      if (route?.kind === ROUTE_KINDS.GROUP) return classified("group", "high", "group-route");
      if (route?.kind === ROUTE_KINDS.EVENT) return classified("event", "high", "event-route");
      if (route?.kind === ROUTE_KINDS.FEED) return classified("feed", "medium", "feed-route");
    }
    if (queryFirst(element, SELECTORS.contentLink) || containsRoute(element, ROUTE_KINDS.CONTENT))
      return classified("content", "medium", "content-link");
    if (queryFirst(element, SELECTORS.eventLink) || containsRoute(element, ROUTE_KINDS.EVENT))
      return classified("event", "medium", "event-link");
    if (queryFirst(element, SELECTORS.groupLink) || containsRoute(element, ROUTE_KINDS.GROUP))
      return classified("group", "medium", "group-link");
    if (queryFirst(element, SELECTORS.profileLink) || containsRoute(element, ROUTE_KINDS.PROFILE))
      return classified("profile", "medium", "profile-link");
    if (element.matches?.("article")) return classified("feed", "low", "generic-article");
    return null;
  }
  function candidateSafety(classification, parsed) {
    const identity2 = parsed.identity;
    const reliableIdentity = !identity2 || identity2.confidence === "high";
    return Object.freeze({
      destructive: classification.confidence === "high" && reliableIdentity,
      durable: classification.confidence !== "low" && Boolean(identity2?.durable) && identity2?.confidence !== "low"
    });
  }

  // ../fl-tools-core/src/fetlife/identity.js
  var ENTITY_TYPES = Object.freeze({
    CONTENT: "content",
    EVENT: "event",
    GROUP: "group",
    PERSON: "person"
  });
  var TYPE_VALUES = new Set(Object.values(ENTITY_TYPES));
  var ID_PATTERNS = Object.freeze({
    content: /\/(?:posts|pictures|videos|statuses|writings)\/(\d+)(?:\/|$)/,
    event: /\/events\/(\d+)\/?$/,
    group: /\/groups\/(\d+)(?:\/|$)/,
    person: /\/users\/(\d+)(?:\/|$)/
  });
  var CANONICAL_TYPE_PATTERNS = Object.freeze({
    content: /\/(?:posts|pictures|videos|statuses|writings)\/[^/]+(?:\/|$)/,
    event: /\/events\/[^/]+(?:\/|$)/,
    group: /\/groups\/[^/]+(?:\/|$)/,
    person: /^\/[^/]+\/?$/
  });
  function normalizeStableId(value) {
    const normalized = String(value ?? "").trim();
    return /^\d+$/.test(normalized) || /^[A-Za-z][A-Za-z0-9_-]{0,31}:[A-Za-z0-9_-]+$/.test(normalized) ? normalized : null;
  }
  function makeIdentity(type, strategy, value, confidence, durable, canonicalUrl = null) {
    return Object.freeze({
      canonicalUrl,
      confidence,
      durable,
      key: `${type}:${strategy}:${value}`,
      strategy,
      type,
      value
    });
  }
  var IdentityResolver = class {
    #idFactory;
    #supportedFallbacks;
    #transientByElement = /* @__PURE__ */ new WeakMap();
    constructor({ idFactory = () => crypto.randomUUID(), supportedFallbacks = {} } = {}) {
      this.#idFactory = idFactory;
      this.#supportedFallbacks = new Map(
        Object.entries(supportedFallbacks).map(([type, namespaces]) => [type, new Set(namespaces)])
      );
    }
    resolve({
      type,
      stableId,
      canonicalUrl,
      canonicalAuthority = false,
      baseUrl,
      fallback,
      element
    } = {}) {
      if (!TYPE_VALUES.has(type)) throw new ContractError("Unknown entity type", { type });
      const normalizedUrl = canonicalizeFetLifeUrl(canonicalUrl, baseUrl);
      const urlId = normalizedUrl?.match(ID_PATTERNS[type])?.[1];
      const resolvedId = normalizeStableId(stableId) ?? normalizeStableId(urlId);
      if (resolvedId) return makeIdentity(type, "id", resolvedId, "high", true, normalizedUrl);
      if (normalizedUrl && canonicalAuthority && CANONICAL_TYPE_PATTERNS[type].test(new URL(normalizedUrl).pathname)) {
        return makeIdentity(type, "url", normalizedUrl, "medium", true, normalizedUrl);
      }
      if (fallback?.namespace && Array.isArray(fallback.parts) && fallback.parts.length > 0 && this.#supportedFallbacks.get(type)?.has(fallback.namespace)) {
        const parts = fallback.parts.map((part) => String(part).trim());
        if (parts.every(Boolean)) {
          const value = `${fallback.namespace}:${parts.map(encodeURIComponent).join(":")}`;
          return makeIdentity(type, "fallback", value, "medium", true);
        }
      }
      if (element && this.#transientByElement.has(element))
        return this.#transientByElement.get(element);
      const transient = makeIdentity(type, "transient", this.#idFactory(), "low", false);
      if (element) this.#transientByElement.set(element, transient);
      return transient;
    }
  };

  // ../fl-tools-core/src/fetlife/parsers/common.js
  function getBaseUrl(element, context = {}) {
    return context.baseUrl ?? context.route?.url ?? element.ownerDocument?.URL ?? "https://fetlife.com/";
  }
  function readRouteLink(element, kind, context) {
    const anchors = [
      ...element.matches?.("a[href]") ? [element] : [],
      ...element.querySelectorAll?.("a[href]") ?? []
    ];
    for (const anchor of anchors) {
      const route = detectRoute(anchor.getAttribute("href"), getBaseUrl(element, context));
      if (route.kind === kind) return { anchor, route, url: route.url };
    }
    return null;
  }
  function readDocumentCanonical(element, context) {
    const link = queryFirst(element.ownerDocument, SELECTORS.canonicalLink);
    return canonicalizeFetLifeUrl(link?.getAttribute("href"), getBaseUrl(element, context));
  }
  function readKnownId(element, attribute) {
    const value = element.getAttribute?.(attribute);
    return /^\d+$/.test(value ?? "") ? value : null;
  }
  function text(element, selectors) {
    return readText(element, selectors);
  }
  function freezeParsed(value) {
    return Object.freeze({
      ...value,
      evidence: Object.freeze(value.evidence.filter(Boolean)),
      metadata: Object.freeze(value.metadata ?? {})
    });
  }

  // ../fl-tools-core/src/fetlife/parsers/content.js
  var CONTENT_TYPES = /* @__PURE__ */ new Set(["posts", "pictures", "videos", "statuses", "writings"]);
  function normalizeContentType(value) {
    if (value === "posts") return "writings";
    return CONTENT_TYPES.has(value) ? value : null;
  }
  function parseContent(element, context) {
    const isRouteRoot = element.matches?.("main") && context.route?.kind === "content";
    const contentLink = readRouteLink(element, ROUTE_KINDS.CONTENT, context);
    const canonicalUrl = contentLink?.url ?? (isRouteRoot ? context.route.url : null);
    const route = contentLink?.route ?? (isRouteRoot ? context.route : null);
    const declaredType = element.getAttribute?.("data-content-type");
    const storyUid = element.getAttribute?.("data-story-uid");
    const storyType = storyUid?.split(":")[0] === "Writing" ? "writings" : null;
    const contentType = normalizeContentType(declaredType) ?? normalizeContentType(route?.params?.contentType) ?? storyType;
    const stableId = readKnownId(element, "data-content-id") ?? route?.params?.contentId ?? (isRouteRoot ? context.route?.params?.contentId : null) ?? storyUid ?? canonicalUrl?.match(/\/(?:posts|pictures|videos|statuses|writings)\/(\d+)(?:\/|$)/)?.[1];
    const identity2 = context.identity.resolve({
      canonicalAuthority: Boolean(contentLink || isRouteRoot),
      canonicalUrl,
      element,
      stableId,
      type: ENTITY_TYPES.CONTENT
    });
    const authorLink = readRouteLink(element, ROUTE_KINDS.PROFILE, context);
    const authorId = readKnownId(element, "data-story-actor-id");
    const authorIdentity = authorLink || authorId ? context.identity.resolve({
      canonicalAuthority: Boolean(authorLink),
      canonicalUrl: authorLink?.url,
      element: authorLink?.anchor ?? element,
      stableId: authorId,
      type: ENTITY_TYPES.PERSON
    }) : null;
    const title = text(element, SELECTORS.title);
    const feedActivity = classifyFeedActivity(element, { contentType });
    return freezeParsed({
      canonicalUrl,
      evidence: [
        stableId && "stable-id",
        canonicalUrl && "content-link",
        contentType && "content-type"
      ],
      identity: identity2,
      kind: "content",
      metadata: {
        authorIdentity,
        contentType,
        feedActivityCategory: feedActivity.category,
        feedActivityType: feedActivity.type,
        sourceUrl: canonicalUrl ? new URL(canonicalUrl, getBaseUrl(element, context)).href : null
      },
      title
    });
  }

  // ../fl-tools-core/src/fetlife/parsers/event.js
  function textForIcon(element, iconName) {
    const icon = element.querySelector?.(`use[href*="#icon-${iconName}"]`);
    const row = icon?.closest?.(".flex.items-start");
    return row?.querySelector?.(".break-words")?.textContent?.replace(/\s+/g, " ").trim() || null;
  }
  function sourceMode(context) {
    try {
      const path = new URL(context.route?.url).pathname.replace(/\/$/, "");
      if (path === "/events/near") return "in-person";
      if (path === "/events/virtual") return "virtual";
    } catch {
    }
    return null;
  }
  function parseEvent(element, context) {
    const isRouteRoot = element.matches?.("main") && context.route?.kind === ROUTE_KINDS.EVENT;
    const routeCanonical = isRouteRoot ? context.route.url : null;
    const documentCanonical = routeCanonical ? readDocumentCanonical(element, context) : null;
    const clickTarget = canonicalizeFetLifeUrl(
      element.getAttribute?.("data-clickable-url-value"),
      getBaseUrl(element, context)
    );
    const linkedCanonical = readRouteLink(element, ROUTE_KINDS.EVENT, context)?.url ?? clickTarget;
    const canonicalUrl = documentCanonical ?? routeCanonical ?? linkedCanonical;
    const stableId = readKnownId(element, "data-event-id") ?? (isRouteRoot ? context.route?.params?.eventId : null) ?? canonicalUrl?.match(/\/events\/(\d+)\/?$/)?.[1];
    const identity2 = context.identity.resolve({
      canonicalAuthority: Boolean(documentCanonical || routeCanonical || linkedCanonical),
      canonicalUrl,
      element,
      stableId,
      type: ENTITY_TYPES.EVENT
    });
    const title = text(element, SELECTORS.title);
    const time = element.querySelector?.("time[datetime]")?.getAttribute("datetime") ?? null;
    const sourceDate = element.closest?.("[data-day-key]")?.getAttribute("data-day-key") ?? null;
    const category = element.querySelector?.('[data-testid="event card category"]')?.textContent?.replace(/\s+/g, " ").trim() || null;
    const timeLabel = textForIcon(element, "clock");
    const location = textForIcon(element, "location");
    const mode = sourceMode(context);
    return freezeParsed({
      canonicalUrl,
      evidence: [
        stableId && "stable-id",
        canonicalUrl && "event-link",
        title && "title",
        time && "time"
      ],
      identity: identity2,
      kind: "event",
      metadata: { category, location, mode, sourceDate, time, timeLabel },
      title
    });
  }

  // ../fl-tools-core/src/fetlife/parsers/feed.js
  function parseFeed(element, context) {
    return freezeParsed({
      canonicalUrl: context.route?.url ?? null,
      evidence: [element.getAttribute?.("role") === "feed" && "feed-role"],
      identity: null,
      kind: "feed",
      metadata: { routeKind: context.route?.kind ?? "unknown" }
    });
  }

  // ../fl-tools-core/src/fetlife/parsers/group.js
  function parseGroup(element, context) {
    const isRouteRoot = element.matches?.("main") && context.route?.kind === ROUTE_KINDS.GROUP;
    const routeCanonical = isRouteRoot ? context.route.url : null;
    const documentCanonical = routeCanonical ? readDocumentCanonical(element, context) : null;
    const linkedCanonical = readRouteLink(element, ROUTE_KINDS.GROUP, context)?.url ?? null;
    const canonicalUrl = documentCanonical ?? routeCanonical ?? linkedCanonical;
    const stableId = readKnownId(element, "data-group-id") ?? (isRouteRoot ? context.route?.params?.groupId : null) ?? canonicalUrl?.match(/\/groups\/(\d+)(?:\/|$)/)?.[1];
    const identity2 = context.identity.resolve({
      canonicalAuthority: Boolean(documentCanonical),
      canonicalUrl,
      element,
      stableId,
      type: ENTITY_TYPES.GROUP
    });
    const title = text(element, SELECTORS.title) ?? element.textContent?.replace(/\s+/g, " ").trim() ?? null;
    return freezeParsed({
      canonicalUrl,
      evidence: [stableId && "stable-id", canonicalUrl && "group-link", title && "title"],
      identity: identity2,
      kind: "group",
      metadata: {},
      title
    });
  }

  // ../fl-tools-core/src/fetlife/parsers/profile.js
  var GENDER_TOKENS = /* @__PURE__ */ new Set([
    "ag",
    "andro",
    "bg",
    "cd/tv",
    "cis",
    "db",
    "dg",
    "demig",
    "dw",
    "fem",
    "gfae",
    "gn",
    "gnc",
    "masc",
    "pg",
    "qg",
    "tg",
    "tm",
    "tw",
    "twos",
    "uog",
    "w",
    "m",
    "f",
    "mtf",
    "ftm",
    "cd",
    "tv",
    "ts",
    "is",
    "b",
    "gf",
    "gq",
    "nb",
    "t",
    "male",
    "female",
    "intersex",
    "trans",
    "non-binary",
    "nonbinary",
    "agender",
    "bigender",
    "genderqueer",
    "genderfluid"
  ]);
  function visibleCount(element, label) {
    const value = element.textContent ?? "";
    const match = value.match(new RegExp(`(\\d[\\d,]*)\\s*(?:${label})`, "i")) ?? value.match(new RegExp(`(?:${label})\\s*\\((\\d[\\d,]*)\\)`, "i"));
    if (!match) return null;
    const count = Number(match[1].replaceAll(",", ""));
    return Number.isSafeInteger(count) && count >= 0 ? count : null;
  }
  function profileFacts(element, context) {
    const tag = queryFirst(element, SELECTORS.profileTag);
    const tagText = tag?.textContent?.replace(/\s+/g, " ").trim() ?? "";
    const match = tagText.match(/^(\d{2,4})\s*([A-Za-z+][\w+/-]{0,24})?\s*(.*)$/);
    const age = Number(match?.[1]);
    const genderToken = match?.[2]?.toLocaleLowerCase() ?? "";
    const gender = GENDER_TOKENS.has(genderToken) ? genderToken : null;
    const role = match ? `${gender ? "" : genderToken} ${match[3] ?? ""}`.trim().toLocaleLowerCase() || null : null;
    const locationLine = tag?.closest("div")?.nextElementSibling;
    const linkedLocation = [...element.querySelectorAll(SELECTORS.profileLocation.join(","))].map((link) => link.textContent?.replace(/\s+/g, " ").trim()).filter(Boolean).join(", ");
    const location = linkedLocation || (locationLine && /text-sm/.test(locationLine.className ?? "") && !locationLine.querySelector("a") ? locationLine.textContent?.replace(/\s+/g, " ").trim() || null : null);
    const relationText = SELECTORS.relationControl.map(
      (selector) => element.querySelector(selector)?.textContent?.replace(/\s+/g, " ").trim() ?? ""
    ).find(Boolean);
    const relationships = /* @__PURE__ */ new Set();
    if (element.querySelector(SELECTORS.followsYouMarker[0])) relationships.add("follows-you");
    if (/^friends?$/i.test(relationText)) relationships.add("friends");
    else if (/following/i.test(relationText)) relationships.add("following");
    else if (/^follow$/i.test(relationText)) relationships.add("none");
    if (context.route?.params?.relationshipList) {
      const contextual = {
        followers: "follows-you",
        following: "following",
        friends: "friends"
      }[context.route.params.section];
      if (contextual) relationships.add(contextual);
    }
    const relationshipList = [...relationships];
    const relationship = relationshipList[0] ?? null;
    return Object.freeze({
      age: Number.isFinite(age) && age >= 18 && age <= 9999 ? age : null,
      gender,
      location,
      pictures: visibleCount(element, "pics?|photos?|pictures?"),
      relationship,
      relationships: relationshipList.length ? Object.freeze(relationshipList) : null,
      roles: role ? Object.freeze([role]) : null,
      videos: visibleCount(element, "vids?|videos?"),
      writings: visibleCount(element, "writings?|posts?")
    });
  }
  function parseProfile(element, context) {
    const isRouteRoot = element.matches?.('main, [data-test-id="profile-header"]') && context.route?.kind === ROUTE_KINDS.PROFILE;
    const routeCanonical = isRouteRoot ? context.route.url : null;
    const documentCanonical = routeCanonical ? readDocumentCanonical(element, context) : null;
    const linkedCanonical = readRouteLink(element, ROUTE_KINDS.PROFILE, context)?.url ?? null;
    const canonicalUrl = documentCanonical ?? routeCanonical ?? linkedCanonical;
    const stableId = readKnownId(element, "data-user-id") ?? (isRouteRoot ? context.route?.params?.personId : null) ?? canonicalUrl?.match(/\/users\/(\d+)(?:\/|$)/)?.[1];
    const identity2 = context.identity.resolve({
      canonicalAuthority: Boolean(documentCanonical || routeCanonical || linkedCanonical),
      canonicalUrl,
      element,
      stableId,
      type: ENTITY_TYPES.PERSON
    });
    const nameElement = queryFirst(element, SELECTORS.displayName)?.cloneNode(true);
    if (element.matches?.('[data-test-id="profile-header"]')) {
      for (const tag of nameElement?.querySelectorAll("span.select-none") ?? []) tag.remove();
    }
    const displayName = (nameElement?.textContent?.replace(/\s+/g, " ").trim() || null) ?? element.getAttribute?.("data-member-card")?.trim() ?? null;
    return freezeParsed({
      canonicalUrl,
      displayName,
      evidence: [
        stableId && "stable-id",
        documentCanonical && "document-canonical",
        !documentCanonical && linkedCanonical && "profile-link",
        displayName && "display-name"
      ],
      identity: identity2,
      kind: "profile",
      metadata: { profileFacts: profileFacts(element, context) }
    });
  }

  // ../fl-tools-core/src/fetlife/parsers/index.js
  var PARSERS = Object.freeze({
    content: parseContent,
    event: parseEvent,
    feed: parseFeed,
    group: parseGroup,
    profile: parseProfile
  });
  function parseCandidate(kind, element, context) {
    const parser = PARSERS[kind];
    if (!parser) throw new ContractError("No parser for candidate kind", { kind });
    return parser(element, context);
  }

  // ../fl-tools-core/src/fetlife/route-monitor.js
  var PAGE_NAVIGATION_EVENTS = Object.freeze([
    "turbo:load",
    "turbo:render",
    "turbo:frame-load",
    "pageshow"
  ]);
  var RouteMonitor = class {
    #controller;
    #current;
    #fetlife;
    #onChange;
    #originalPushState;
    #originalReplaceState;
    #revision = 0;
    #started = false;
    #window;
    constructor({ window, fetlife, onChange = () => {
    } }) {
      if (!window?.history || !fetlife || typeof onChange !== "function") {
        throw new ContractError("Route monitor dependencies are required");
      }
      this.#window = window;
      this.#fetlife = fetlife;
      this.#onChange = onChange;
    }
    get context() {
      return this.#current;
    }
    start() {
      if (this.#started) return this.#current;
      this.#started = true;
      this.#originalPushState = this.#window.history.pushState;
      this.#originalReplaceState = this.#window.history.replaceState;
      this.#window.history.pushState = this.#wrapHistory(this.#originalPushState);
      this.#window.history.replaceState = this.#wrapHistory(this.#originalReplaceState);
      this.#window.addEventListener("popstate", this.#refresh);
      this.#window.addEventListener("hashchange", this.#refresh);
      const document = this.#window.document;
      for (const type of PAGE_NAVIGATION_EVENTS) {
        this.#window.addEventListener(type, this.#refresh);
        document?.addEventListener(type, this.#refresh);
      }
      this.#refresh();
      return this.#current;
    }
    stop(reason = "route-monitor-stop") {
      if (!this.#started) return;
      this.#window.removeEventListener("popstate", this.#refresh);
      this.#window.removeEventListener("hashchange", this.#refresh);
      const document = this.#window.document;
      for (const type of PAGE_NAVIGATION_EVENTS) {
        this.#window.removeEventListener(type, this.#refresh);
        document?.removeEventListener(type, this.#refresh);
      }
      if (this.#window.history.pushState === this.#wrappedPushState) {
        this.#window.history.pushState = this.#originalPushState;
      }
      if (this.#window.history.replaceState === this.#wrappedReplaceState) {
        this.#window.history.replaceState = this.#originalReplaceState;
      }
      this.#controller?.abort(reason);
      this.#started = false;
    }
    #wrappedPushState;
    #wrappedReplaceState;
    #wrapHistory(original) {
      const monitor = this;
      const wrapped = function(...args) {
        const result3 = Reflect.apply(original, this, args);
        monitor.#refresh();
        return result3;
      };
      if (original === this.#originalPushState) this.#wrappedPushState = wrapped;
      else this.#wrappedReplaceState = wrapped;
      return wrapped;
    }
    #refresh = () => {
      const route = this.#fetlife.detectRoute(this.#window.location.href);
      if (this.#current?.route.url === route.url && this.#current?.route.kind === route.kind) return;
      const previous = this.#current;
      this.#controller?.abort("navigation");
      this.#controller = new AbortController();
      this.#current = Object.freeze({
        revision: ++this.#revision,
        route,
        signal: this.#controller.signal
      });
      this.#onChange(this.#current, previous);
    };
  };

  // ../fl-tools-core/src/fetlife/service.js
  var FetLifeService = class {
    #identity;
    constructor({ idFactory, supportedFallbacks } = {}) {
      this.#identity = new IdentityResolver({ idFactory, supportedFallbacks });
    }
    get selectors() {
      return SELECTORS;
    }
    detectRoute(value, baseUrl) {
      return detectRoute(value, baseUrl);
    }
    classify(element, route) {
      return classifyElement(element, route);
    }
    parse(kind, element, { route, baseUrl } = {}) {
      return parseCandidate(kind, element, {
        baseUrl,
        identity: this.#identity,
        route
      });
    }
    createCandidate(element, route) {
      const classification = this.classify(element, route);
      if (!classification) return null;
      const parsed = this.parse(classification.kind, element, { route });
      return Object.freeze({
        confidence: classification.confidence,
        context: Object.freeze({ route }),
        element,
        evidence: classification.evidence,
        kind: classification.kind,
        parsed,
        safeFor: candidateSafety(classification, parsed)
      });
    }
  };

  // ../fl-tools-core/src/scanner/scanner.js
  var FLUSH_KEY = "core.scanner.flush";
  function fingerprint(candidate) {
    const element = candidate.element;
    const text2 = element.textContent?.replace(/\s+/g, " ").trim().slice(0, 1024) ?? "";
    return [
      candidate.kind,
      candidate.parsed.identity?.key ?? "",
      element.getAttribute?.("data-content-id") ?? "",
      element.getAttribute?.("data-user-id") ?? "",
      element.childElementCount ?? 0,
      text2
    ].join("|");
  }
  var Scanner = class {
    #eventBus;
    #fetlife;
    #fingerprints = /* @__PURE__ */ new WeakMap();
    #observer;
    #observerFactory;
    #pending = /* @__PURE__ */ new Set();
    #root;
    #routeContext;
    #scheduler;
    #started = false;
    #subscribers = /* @__PURE__ */ new Map();
    constructor({
      scheduler,
      fetlife,
      eventBus,
      observerFactory = (callback) => new globalThis.MutationObserver(callback)
    }) {
      if (!scheduler || !fetlife || !eventBus || typeof observerFactory !== "function") {
        throw new ContractError("Scanner dependencies are required");
      }
      this.#scheduler = scheduler;
      this.#fetlife = fetlife;
      this.#eventBus = eventBus;
      this.#observerFactory = observerFactory;
    }
    start({ root, routeContext }) {
      if (this.#started) throw new ContractError("Scanner is already started");
      if (!root?.querySelectorAll || !routeContext?.route) {
        throw new ContractError("Scanner root and route context are required");
      }
      this.#root = root;
      this.#routeContext = routeContext;
      this.#observer = this.#observerFactory(this.#onMutations);
      this.#observer.observe(root, {
        attributeFilter: [CURRENT_ACCOUNT_ATTRIBUTE],
        attributes: true,
        childList: true,
        subtree: true
      });
      this.#started = true;
      this.scan(root);
    }
    setRoute(routeContext) {
      if (!this.#started) throw new ContractError("Scanner is not started");
      this.#scheduler.cancel(FLUSH_KEY, "navigation");
      this.#routeContext = routeContext;
      this.#pending.clear();
      this.#fingerprints = /* @__PURE__ */ new WeakMap();
      this.scan(this.#root);
    }
    subscribe(kinds, callback, { signal } = {}) {
      if (!Array.isArray(kinds) || kinds.length === 0 || typeof callback !== "function") {
        throw new ContractError("Scanner subscription requires kinds and callback");
      }
      if (signal?.aborted) return () => {
      };
      const entries = [];
      for (const kind of new Set(kinds)) {
        const subscribers = this.#subscribers.get(kind) ?? /* @__PURE__ */ new Set();
        subscribers.add(callback);
        this.#subscribers.set(kind, subscribers);
        entries.push([kind, subscribers]);
      }
      const unsubscribe = () => {
        for (const [kind, subscribers] of entries) {
          subscribers.delete(callback);
          if (subscribers.size === 0) this.#subscribers.delete(kind);
        }
        signal?.removeEventListener("abort", unsubscribe);
      };
      signal?.addEventListener("abort", unsubscribe, { once: true });
      return unsubscribe;
    }
    scan(node) {
      if (!this.#started || !node) return;
      this.#collect(node);
      this.#queueFlush();
    }
    refresh(node = this.#root) {
      if (!this.#started || !node) return;
      this.#fingerprints = /* @__PURE__ */ new WeakMap();
      this.scan(node);
    }
    stop() {
      if (!this.#started) return;
      this.#observer.disconnect();
      this.#scheduler.cancel(FLUSH_KEY, "scanner-stop");
      this.#pending.clear();
      this.#subscribers.clear();
      this.#fingerprints = /* @__PURE__ */ new WeakMap();
      this.#root = void 0;
      this.#routeContext = void 0;
      this.#started = false;
    }
    #onMutations = (mutations) => {
      this.#eventBus.emit("scanner:mutated", { count: mutations.length });
      for (const mutation of mutations) {
        this.#collect(mutation.target);
        for (const node of mutation.addedNodes) this.#collect(node);
      }
      this.#queueFlush();
    };
    #collect(node) {
      if (node.nodeType !== 1 && node.nodeType !== 9) return;
      if (node.nodeType === 1) {
        const closest = node.closest?.(CANDIDATE_ROOT_QUERY);
        if (closest && this.#root.contains(closest)) this.#pending.add(closest);
      }
      for (const element of node.querySelectorAll?.(CANDIDATE_ROOT_QUERY) ?? []) {
        this.#pending.add(element);
      }
    }
    #queueFlush() {
      if (this.#pending.size === 0) return;
      this.#scheduler.schedule({
        key: FLUSH_KEY,
        phase: "READ",
        priority: "VISIBLE",
        signal: this.#routeContext.signal,
        task: () => this.#flush()
      }).catch((error) => {
        if (error?.name !== "AbortError") this.#eventBus.emit("scanner:error", { error });
      });
    }
    #flush() {
      const elements = [...this.#pending];
      this.#pending.clear();
      for (const element of elements) {
        if (element.isConnected === false) continue;
        try {
          const candidate = this.#fetlife.createCandidate(element, this.#routeContext.route);
          if (!candidate) continue;
          const nextFingerprint = fingerprint(candidate);
          if (this.#fingerprints.get(element) === nextFingerprint) continue;
          this.#fingerprints.set(element, nextFingerprint);
          this.#dispatch(candidate);
        } catch (error) {
          this.#eventBus.emit("scanner:parse-error", { error, element });
        }
      }
    }
    #dispatch(candidate) {
      for (const subscriber of [...this.#subscribers.get(candidate.kind) ?? []]) {
        try {
          subscriber(candidate);
        } catch (error) {
          this.#eventBus.emit("scanner:subscriber-error", {
            candidateKind: candidate.kind,
            error
          });
        }
      }
      this.#eventBus.emit("scanner:candidate", candidate);
    }
  };

  // ../fl-tools-core/src/scheduler/scheduler.js
  var PRIORITIES = Object.freeze({
    INTERACTIVE: 0,
    VISIBLE: 1,
    NORMAL: 2,
    BACKGROUND: 3,
    IDLE: 4
  });
  var PHASES = Object.freeze({ READ: 0, WRITE: 1 });
  function abortError(reason = "Task aborted") {
    const error = new Error(String(reason));
    error.name = "AbortError";
    return error;
  }
  var Scheduler = class {
    #autoStart;
    #destroyed = false;
    #flushPending = false;
    #inFlight = false;
    #maxQueued;
    #metric;
    #now;
    #queue = [];
    #sequence = 0;
    #tasksByKey = /* @__PURE__ */ new Map();
    constructor({ maxQueued = 1e3, autoStart = true, metric = () => {
    }, now = Date.now } = {}) {
      if (!Number.isInteger(maxQueued) || maxQueued < 1) {
        throw new ContractError("maxQueued must be a positive integer");
      }
      this.#maxQueued = maxQueued;
      this.#autoStart = autoStart;
      this.#metric = metric;
      this.#now = now;
    }
    get size() {
      return this.#queue.length;
    }
    schedule({ task, priority = "NORMAL", phase = "READ", key, signal } = {}) {
      if (this.#destroyed) return Promise.reject(new SchedulerError("Scheduler is destroyed"));
      if (typeof task !== "function")
        return Promise.reject(new ContractError("Scheduled task is required"));
      if (!(priority in PRIORITIES)) return Promise.reject(new ContractError("Unknown priority"));
      if (!(phase in PHASES)) return Promise.reject(new ContractError("Unknown scheduler phase"));
      if (signal?.aborted) return Promise.reject(abortError(signal.reason));
      if (key !== void 0 && this.#tasksByKey.has(key)) return this.#tasksByKey.get(key).promise;
      if (this.#queue.length >= this.#maxQueued) {
        this.#metric({ depth: this.#queue.length, type: "backpressure" });
        return Promise.reject(
          new SchedulerError("Scheduler backpressure limit reached", { maxQueued: this.#maxQueued })
        );
      }
      let resolve2;
      let reject;
      const promise = new Promise((onResolve, onReject) => {
        resolve2 = onResolve;
        reject = onReject;
      });
      const entry = {
        key,
        phase,
        priority,
        promise,
        reject,
        resolve: resolve2,
        sequence: this.#sequence++,
        signal,
        task
      };
      this.#queue.push(entry);
      this.#metric({ depth: this.#queue.length, type: "queue" });
      if (key !== void 0) this.#tasksByKey.set(key, entry);
      if (this.#autoStart) this.#requestFlush();
      return promise;
    }
    async flush() {
      if (this.#inFlight) return;
      this.#flushPending = false;
      this.#inFlight = true;
      try {
        while (this.#queue.length > 0 && !this.#destroyed) {
          const batch = this.#queue.splice(0).sort((left, right) => {
            return PRIORITIES[left.priority] - PRIORITIES[right.priority] || PHASES[left.phase] - PHASES[right.phase] || left.sequence - right.sequence;
          });
          this.#metric({ depth: this.#queue.length, type: "queue" });
          for (const entry of batch) await this.#run(entry);
          await Promise.resolve();
        }
      } finally {
        this.#inFlight = false;
        if (this.#queue.length > 0 && !this.#destroyed && this.#autoStart) this.#requestFlush();
      }
    }
    cancel(key, reason = "Task cancelled") {
      const entry = this.#tasksByKey.get(key);
      if (!entry) return false;
      const index = this.#queue.indexOf(entry);
      if (index !== -1) this.#queue.splice(index, 1);
      this.#metric({ depth: this.#queue.length, type: "queue" });
      this.#tasksByKey.delete(key);
      entry.reject(abortError(reason));
      return true;
    }
    destroy(reason = "Scheduler destroyed") {
      this.#destroyed = true;
      for (const entry of this.#queue.splice(0)) {
        if (entry.key !== void 0) this.#tasksByKey.delete(entry.key);
        entry.reject(abortError(reason));
      }
      this.#metric({ depth: 0, type: "queue" });
    }
    #requestFlush() {
      if (this.#flushPending || this.#inFlight) return;
      this.#flushPending = true;
      queueMicrotask(() => void this.flush());
    }
    async #run(entry) {
      if (entry.key !== void 0) this.#tasksByKey.delete(entry.key);
      if (entry.signal?.aborted) {
        entry.reject(abortError(entry.signal.reason));
        return;
      }
      const startedAt = this.#now();
      try {
        entry.resolve(await entry.task({ signal: entry.signal }));
      } catch (error) {
        entry.reject(error);
      } finally {
        this.#metric({
          durationMs: Math.max(0, this.#now() - startedAt),
          taskClass: entry.key === "core.scanner.flush" ? "scanner" : "scheduled",
          type: "task"
        });
      }
    }
  };

  // ../fl-tools-core/src/platform/diagnostics.js
  var DIAGNOSTIC_RESULTS = Object.freeze(["PASS", "WARN", "FAIL", "NOT_APPLICABLE"]);
  var DIAGNOSTIC_CATEGORIES = Object.freeze([
    "CORE_RUNTIME",
    "COMPATIBILITY",
    "PARSER",
    "STORAGE",
    "NETWORK",
    "FILESYSTEM",
    "FEATURE",
    "SECURITY",
    "PERFORMANCE",
    "UPDATE"
  ]);
  var DIAGNOSTIC_SEVERITIES = Object.freeze(["INFO", "WARN", "ERROR", "FATAL"]);
  var SENSITIVE_KEY = /account|authorization|cookie|credential|favorite|filesystem|group|history|message|note|password|path|profile|secret|subject|token|url|vault/i;
  function assertEnum(value, allowed, label) {
    if (!allowed.includes(value)) throw new ContractError(`Invalid diagnostic ${label}`, { value });
  }
  function redactString(value) {
    return String(value).replace(
      /\b(authorization|cookie|password|token|secret|api[_-]?key)\s*[:=]\s*[^\s,;]+/gi,
      "$1=[REDACTED]"
    ).replace(/\bbearer\s+[a-z0-9._~+/=-]+/gi, "Bearer [REDACTED]").replace(/https?:\/\/[^\s)\]}]+/gi, "[REDACTED_URL]").replace(/\b[a-z]:\\[^\r\n"']+/gi, "[REDACTED_PATH]").replace(/\/(?:Users|home|var|private|mnt)\/[^\r\n"']+/g, "[REDACTED_PATH]");
  }
  function sanitize(value, seen = /* @__PURE__ */ new WeakSet()) {
    if (value === null || value === void 0 || typeof value === "boolean" || typeof value === "number")
      return value;
    if (typeof value === "string") return redactString(value);
    if (typeof value !== "object") return String(value);
    if (seen.has(value)) return "[CIRCULAR]";
    seen.add(value);
    if (Array.isArray(value)) {
      const result3 = value.slice(0, 25).map((item) => sanitize(item, seen));
      seen.delete(value);
      return result3;
    }
    const output = {};
    for (const [key, item] of Object.entries(value).slice(0, 50)) {
      output[key] = SENSITIVE_KEY.test(key) && !(key === "FILESYSTEM" && typeof item === "number") ? "[REDACTED]" : sanitize(item, seen);
    }
    seen.delete(value);
    return output;
  }
  function freezeRecord(record) {
    return Object.freeze({ ...record, details: Object.freeze({ ...record.details ?? {} }) });
  }
  var DiagnosticsService = class {
    #clock;
    #console = [];
    #captureStop;
    #captureStarted = null;
    #contextSnapshot;
    #healthSnapshot;
    #limit;
    #records = [];
    #selfTests = /* @__PURE__ */ new Map();
    #version;
    constructor({
      version,
      limit = 100,
      clock = Date.now,
      contextSnapshot = () => ({}),
      healthSnapshot = () => null
    }) {
      if (!version || !Number.isInteger(limit) || limit < 1 || typeof clock !== "function" || typeof contextSnapshot !== "function") {
        throw new ContractError("Diagnostics dependencies are invalid");
      }
      this.#version = version;
      this.#limit = limit;
      this.#clock = clock;
      this.#contextSnapshot = contextSnapshot;
      this.#healthSnapshot = healthSnapshot;
    }
    record({ category, code, severity = "ERROR", message, details = {}, productId: productId2 = null, error }) {
      assertEnum(category, DIAGNOSTIC_CATEGORIES, "category");
      assertEnum(severity, DIAGNOSTIC_SEVERITIES, "severity");
      if (!/^[A-Z][A-Z0-9_]{2,79}$/.test(code ?? "") || typeof message !== "string" || !message) {
        throw new ContractError("Diagnostic code and message are required");
      }
      const normalized = error instanceof Error ? error : null;
      const record = freezeRecord({
        category,
        code,
        details,
        error: normalized ? Object.freeze({
          message: normalized.message,
          name: normalized.name,
          stack: normalized.stack
        }) : null,
        message,
        productId: productId2,
        severity,
        timestamp: this.#clock()
      });
      this.#records.push(record);
      if (this.#records.length > this.#limit) this.#records.shift();
      return record;
    }
    captureConsole(view) {
      if (!view?.addEventListener || this.#captureStop) return;
      this.#captureStarted = this.#clock();
      const write = (level, args) => {
        try {
          const text2 = args.slice(0, 6).map((value) => {
            if (typeof value === "string") return redactString(value).slice(0, 500);
            if (typeof value === "number" || typeof value === "boolean") return String(value);
            if (value instanceof Error || typeof view.Error === "function" && value instanceof view.Error)
              return redactString(value.message).slice(0, 500);
            return "[object omitted]";
          }).join(" ");
          this.#console.push({ level, text: text2, timestamp: this.#clock(), source: "page-console" });
          if (this.#console.length > this.#limit) this.#console.shift();
        } catch {
        }
      };
      const restores = [];
      for (const level of ["log", "info", "warn", "error", "debug"]) {
        const original = view.console?.[level];
        if (typeof original !== "function") continue;
        const wrapper = (...args) => {
          write(level, args);
          return Reflect.apply(original, view.console, args);
        };
        try {
          view.console[level] = wrapper;
          restores.push(() => {
            if (view.console[level] === wrapper) view.console[level] = original;
          });
        } catch {
        }
      }
      const error = (event) => write("error", [event.error ?? event.message ?? "Script error"]);
      const rejection = (event) => write("error", [event.reason ?? "Unhandled rejection"]);
      view.addEventListener("error", error);
      view.addEventListener("unhandledrejection", rejection);
      this.#captureStop = () => {
        for (const restore of restores) restore();
        view.removeEventListener("error", error);
        view.removeEventListener("unhandledrejection", rejection);
      };
    }
    stopCapture() {
      this.#captureStop?.();
      this.#captureStop = void 0;
    }
    clearActivity() {
      this.#records = [];
      this.#console = [];
    }
    resetSession() {
      this.clearActivity();
      this.#captureStarted = this.#clock();
    }
    registerSelfTest({ id, category, run }) {
      if (!/^[a-z][a-z0-9.-]+$/.test(id ?? "") || typeof run !== "function") {
        throw new ContractError("Diagnostic self-test requires a stable id and runner");
      }
      assertEnum(category, DIAGNOSTIC_CATEGORIES, "category");
      if (this.#selfTests.has(id)) throw new ContractError("Duplicate diagnostic self-test", { id });
      this.#selfTests.set(id, { category, run });
      return () => this.#selfTests.delete(id);
    }
    async runSelfTests() {
      const results = [];
      for (const [id, test] of this.#selfTests) {
        try {
          const output = await test.run() ?? {};
          const result3 = output.result ?? "PASS";
          assertEnum(result3, DIAGNOSTIC_RESULTS, "result");
          results.push(
            Object.freeze({
              category: test.category,
              details: Object.freeze({ ...output.details ?? {} }),
              id,
              message: String(output.message ?? result3),
              result: result3
            })
          );
        } catch (error) {
          results.push(
            Object.freeze({
              category: test.category,
              details: Object.freeze({}),
              id,
              message: error instanceof Error ? error.message : String(error),
              result: "FAIL"
            })
          );
        }
      }
      return Object.freeze(results);
    }
    recent() {
      return Object.freeze([...this.#records]);
    }
    report({ detailed = false, shareable = true, selfTests = [] } = {}) {
      const counts = Object.fromEntries(DIAGNOSTIC_SEVERITIES.map((severity) => [severity, 0]));
      const categoryCounts = Object.fromEntries(
        DIAGNOSTIC_CATEGORIES.map((category) => [category, 0])
      );
      for (const record of this.#records) counts[record.severity] += 1;
      for (const record of this.#records) categoryCounts[record.category] += 1;
      const context = this.#contextSnapshot() ?? {};
      const report2 = {
        categoryCounts,
        context,
        page: { ...context.page ?? {}, route: context.route ?? {} },
        technical: {
          environment: context.environment ?? {},
          runtime: context.runtime ?? {},
          health: this.#healthSnapshot()
        },
        console: {
          startedAt: this.#captureStarted,
          active: Boolean(this.#captureStop),
          limitation: "Only console calls and uncaught errors observed after Core starts; other extension consoles and earlier history are unavailable. Page logs are not attributed to a plugin.",
          records: detailed ? this.#console.slice(-25) : [],
          retained: this.#console.length
        },
        plugins: context.pluginStatus ?? [],
        conflicts: context.conflicts ?? [],
        counts,
        generatedAt: this.#clock(),
        health: this.#healthSnapshot(),
        retainedRecords: this.#records.length,
        schemaVersion: 3,
        selfTests,
        version: this.#version
      };
      if (detailed) {
        report2.recent = this.#records.map(({ error, ...record }) => ({
          ...record,
          error: error ? { message: error.message, name: error.name } : null
        }));
      }
      return Object.freeze(shareable ? sanitize(report2) : report2);
    }
  };

  // ../fl-tools-core/src/platform/health.js
  var HEALTH_STATES = Object.freeze({
    DEGRADED: "DEGRADED",
    HEALTHY: "HEALTHY",
    WARNING: "WARNING"
  });
  var HealthMonitor = class {
    #aborted = 0;
    #degradedReasons = /* @__PURE__ */ new Set();
    #featureFailures = 0;
    #errorCodes = /* @__PURE__ */ new Map();
    #listeners = /* @__PURE__ */ new Set();
    #parserFailures = 0;
    #parserRuns = 0;
    #slowHandlers = 0;
    #state = HEALTH_STATES.HEALTHY;
    #storageErrors = 0;
    record({ kind, outcome = "PASS", durationMs = 0, code = null } = {}) {
      if (!["ABORT", "COMPATIBILITY", "FEATURE", "PARSER", "STORAGE", "TASK"].includes(kind)) {
        throw new ContractError("Unknown health signal", { kind });
      }
      if (kind === "PARSER") {
        this.#parserRuns += 1;
        if (outcome === "FAIL") this.#parserFailures += 1;
      }
      if (kind === "FEATURE" && outcome === "FAIL") this.#featureFailures += 1;
      if (kind === "STORAGE" && outcome === "FAIL") this.#storageErrors += 1;
      if (kind === "ABORT" || outcome === "ABORTED") this.#aborted += 1;
      if (outcome === "FAIL" && code) {
        this.#errorCodes.set(code, (this.#errorCodes.get(code) ?? 0) + 1);
      }
      if (Number.isFinite(durationMs) && durationMs >= 250) this.#slowHandlers += 1;
      if (kind === "COMPATIBILITY" && outcome === "FAIL") {
        this.#degradedReasons.add(code ?? "COMPATIBILITY_FAILURE");
      }
      if (this.#parserRuns >= 5 && this.#parserFailures / this.#parserRuns >= 0.5) {
        this.#degradedReasons.add("PARSER_FAILURE_RATE");
      }
      if (this.#storageErrors >= 3) this.#degradedReasons.add("REPEATED_STORAGE_FAILURE");
      if (this.#featureFailures >= 3) this.#degradedReasons.add("REPEATED_FEATURE_FAILURE");
      this.#recalculate();
      return this.snapshot();
    }
    enterDegraded(code) {
      if (!/^[A-Z][A-Z0-9_]{2,79}$/.test(code ?? "")) {
        throw new ContractError("Degraded Mode requires a stable reason code");
      }
      this.#degradedReasons.add(code);
      this.#recalculate();
    }
    subscribe(listener) {
      if (typeof listener !== "function") throw new ContractError("Health listener is required");
      this.#listeners.add(listener);
      return () => this.#listeners.delete(listener);
    }
    snapshot() {
      return Object.freeze({
        abortedWork: this.#aborted,
        degraded: this.#state === HEALTH_STATES.DEGRADED,
        featureFailures: this.#featureFailures,
        parserFailureRate: this.#parserRuns ? this.#parserFailures / this.#parserRuns : 0,
        parserRuns: this.#parserRuns,
        reasons: Object.freeze([...this.#degradedReasons]),
        repeatedErrors: Object.freeze(
          [...this.#errorCodes.entries()].filter(([, count]) => count >= 2).map(([code, count]) => Object.freeze({ code, count }))
        ),
        slowHandlers: this.#slowHandlers,
        state: this.#state,
        storageErrors: this.#storageErrors
      });
    }
    #recalculate() {
      const previous = this.#state;
      if (this.#degradedReasons.size > 0) this.#state = HEALTH_STATES.DEGRADED;
      else if (this.#featureFailures || this.#parserFailures || this.#storageErrors || this.#slowHandlers)
        this.#state = HEALTH_STATES.WARNING;
      else this.#state = HEALTH_STATES.HEALTHY;
      if (previous !== this.#state) {
        const snapshot = this.snapshot();
        for (const listener of this.#listeners) listener(snapshot, previous);
      }
    }
  };

  // ../fl-tools-core/src/platform/runtime-metrics.js
  var DEFAULT_BUDGETS = Object.freeze({
    queueDepth: 250,
    scannerBatchMs: 50,
    schedulerTaskMs: 100,
    storageUtilization: 0.9
  });
  var MAX_ERROR_CODES = 25;
  var RuntimeMetrics = class {
    #backpressure = 0;
    #budgets;
    #errorCodes = /* @__PURE__ */ new Map();
    #estimateStorage;
    #maxQueueDepth = 0;
    #queueDepth = 0;
    #scanner = { batches: 0, maxDurationMs: 0, slowBatches: 0 };
    #scheduler = { maxDurationMs: 0, slowTasks: 0, tasks: 0 };
    #storage = { available: false, quota: null, usage: null, utilization: null };
    constructor({ budgets = {}, estimateStorage } = {}) {
      this.#budgets = Object.freeze({ ...DEFAULT_BUDGETS, ...budgets });
      this.#estimateStorage = estimateStorage;
    }
    recordScheduler(metric) {
      if (metric?.type === "queue") {
        this.#queueDepth = Math.max(0, Number(metric.depth) || 0);
        this.#maxQueueDepth = Math.max(this.#maxQueueDepth, this.#queueDepth);
      } else if (metric?.type === "backpressure") {
        this.#backpressure += 1;
      } else if (metric?.type === "task") {
        const duration = Math.max(0, Number(metric.durationMs) || 0);
        this.#scheduler.tasks += 1;
        this.#scheduler.maxDurationMs = Math.max(this.#scheduler.maxDurationMs, duration);
        if (duration >= this.#budgets.schedulerTaskMs) this.#scheduler.slowTasks += 1;
        if (metric.taskClass === "scanner") {
          this.#scanner.batches += 1;
          this.#scanner.maxDurationMs = Math.max(this.#scanner.maxDurationMs, duration);
          if (duration >= this.#budgets.scannerBatchMs) this.#scanner.slowBatches += 1;
        }
      }
      return this.snapshot();
    }
    recordError(code = "UNKNOWN") {
      const safe = /^[A-Z][A-Z0-9_]{2,79}$/.test(code) ? code : "UNKNOWN";
      this.#errorCodes.set(safe, (this.#errorCodes.get(safe) ?? 0) + 1);
      if (this.#errorCodes.size > MAX_ERROR_CODES) {
        const first = this.#errorCodes.keys().next().value;
        this.#errorCodes.delete(first);
      }
    }
    async refreshStorage() {
      if (typeof this.#estimateStorage !== "function") return this.snapshot();
      try {
        const estimate = await this.#estimateStorage();
        const usage = Number.isFinite(estimate?.usage) ? estimate.usage : null;
        const quota = Number.isFinite(estimate?.quota) && estimate.quota > 0 ? estimate.quota : null;
        this.#storage = {
          available: usage !== null || quota !== null,
          quota,
          usage,
          utilization: usage !== null && quota !== null ? usage / quota : null
        };
      } catch {
        this.#storage = { available: false, quota: null, usage: null, utilization: null };
      }
      return this.snapshot();
    }
    snapshot() {
      const violations = [];
      if (this.#maxQueueDepth >= this.#budgets.queueDepth) violations.push("QUEUE_DEPTH");
      if (this.#scheduler.slowTasks) violations.push("SCHEDULER_TASK_DURATION");
      if (this.#scanner.slowBatches) violations.push("SCANNER_BATCH_DURATION");
      if (this.#storage.utilization !== null && this.#storage.utilization >= this.#budgets.storageUtilization) {
        violations.push("STORAGE_UTILIZATION");
      }
      if (this.#backpressure) violations.push("SCHEDULER_BACKPRESSURE");
      return Object.freeze({
        backpressure: this.#backpressure,
        budgets: this.#budgets,
        errors: Object.freeze(
          [...this.#errorCodes.entries()].map(([code, count]) => Object.freeze({ code, count })).sort((left, right) => right.count - left.count || left.code.localeCompare(right.code))
        ),
        queue: Object.freeze({ current: this.#queueDepth, maximum: this.#maxQueueDepth }),
        scanner: Object.freeze({ ...this.#scanner }),
        scheduler: Object.freeze({ ...this.#scheduler }),
        storage: Object.freeze({ ...this.#storage }),
        violations: Object.freeze(violations)
      });
    }
  };

  // ../fl-tools-core/src/platform/notifications.js
  var NOTIFICATION_PRIORITIES = Object.freeze({
    CRITICAL: 4,
    HIGH: 3,
    LOW: 1,
    NORMAL: 2
  });
  var KINDS = /* @__PURE__ */ new Set([
    "COMPATIBILITY",
    "DEGRADED_MODE",
    "FEATURE_DISCOVERY",
    "FEATURE_FAILURE",
    "POST_UPDATE",
    "SYSTEM",
    "UPDATE_AVAILABLE"
  ]);
  var NotificationCenter = class {
    #clock;
    #items = /* @__PURE__ */ new Map();
    #listeners = /* @__PURE__ */ new Set();
    constructor({ clock = Date.now } = {}) {
      this.#clock = clock;
    }
    upsert({ id, kind, priority = "NORMAL", title, message, bullets = [], actions = [] }) {
      if (!/^[a-z][a-z0-9.-]+$/.test(id ?? "") || !KINDS.has(kind) || !(priority in NOTIFICATION_PRIORITIES) || typeof title !== "string" || !title || typeof message !== "string" || !Array.isArray(bullets) || bullets.length > 4 || !Array.isArray(actions) || actions.length > 2) {
        throw new ContractError("Notification contract is invalid");
      }
      const previous = this.#items.get(id);
      const item = Object.freeze({
        actions: Object.freeze(
          actions.map((action) => {
            if (!action?.label || typeof action.handler !== "function") {
              throw new ContractError("Notification actions require a label and handler");
            }
            return Object.freeze({ label: String(action.label), handler: action.handler });
          })
        ),
        bullets: Object.freeze(bullets.map(String)),
        createdAt: previous?.createdAt ?? this.#clock(),
        id,
        kind,
        message,
        priority,
        title,
        updatedAt: this.#clock()
      });
      this.#items.set(id, item);
      this.#emit();
      return item;
    }
    dismiss(id) {
      const removed = this.#items.delete(id);
      if (removed) this.#emit();
      return removed;
    }
    active() {
      return this.list()[0] ?? null;
    }
    list() {
      return Object.freeze(
        [...this.#items.values()].sort(
          (a, b) => NOTIFICATION_PRIORITIES[b.priority] - NOTIFICATION_PRIORITIES[a.priority] || a.createdAt - b.createdAt
        )
      );
    }
    subscribe(listener) {
      if (typeof listener !== "function")
        throw new ContractError("Notification listener is required");
      this.#listeners.add(listener);
      listener(this.active());
      return () => this.#listeners.delete(listener);
    }
    clear() {
      if (this.#items.size === 0) return;
      this.#items.clear();
      this.#emit();
    }
    #emit() {
      const active = this.active();
      for (const listener of this.#listeners) listener(active);
    }
  };

  // ../fl-tools-core/src/platform/updates.js
  var import_semver2 = __toESM(require_semver2(), 1);
  var RELEASE_CHANNELS = Object.freeze(["stable", "beta"]);
  function parseUserscriptVersion(source) {
    return String(source ?? "").match(/^\/\/ @version\s+(\S+)/m)?.[1] ?? "";
  }
  function compareScriptVersions(left, right) {
    if ((0, import_semver2.valid)(left) && (0, import_semver2.valid)(right)) return (0, import_semver2.compare)(left, right);
    const leftParts = String(left).split(/[.-]/u).map((part) => Number.parseInt(part, 10) || 0);
    const rightParts = String(right).split(/[.-]/u).map((part) => Number.parseInt(part, 10) || 0);
    const length = Math.max(leftParts.length, rightParts.length);
    for (let index = 0; index < length; index += 1) {
      const diff = (leftParts[index] || 0) - (rightParts[index] || 0);
      if (diff) return diff;
    }
    return 0;
  }
  function normalizeRelease(productId2, release) {
    if (!release || !(0, import_semver2.valid)(release.version) || !RELEASE_CHANNELS.includes(release.channel) || !Array.isArray(release.summary) || release.summary.length < 1 || release.summary.length > 4) {
      throw new ContractError("Update provider returned invalid release metadata", { productId: productId2 });
    }
    return Object.freeze({
      channel: release.channel,
      productId: productId2,
      summary: Object.freeze(release.summary.map(String)),
      version: release.version
    });
  }
  var UpdateManager = class {
    #installed = /* @__PURE__ */ new Map();
    #notifications;
    #providers = /* @__PURE__ */ new Map();
    constructor({ notifications }) {
      if (!notifications?.upsert) throw new ContractError("Update manager requires notifications");
      this.#notifications = notifications;
    }
    registerProduct({ productId: productId2, name, version, channel, provider }) {
      if (!/^[a-z][a-z0-9-]*$/.test(productId2 ?? "") || !name || !(0, import_semver2.valid)(version) || !RELEASE_CHANNELS.includes(channel) || typeof provider?.getLatest !== "function") {
        throw new ContractError("Product update registration is invalid");
      }
      if (this.#providers.has(productId2))
        throw new ContractError("Update provider already registered");
      this.#providers.set(productId2, { channel, name, provider, version });
      return () => this.#providers.delete(productId2);
    }
    async check(productId2, { signal } = {}) {
      const entry = this.#providers.get(productId2);
      if (!entry) throw new ContractError("Unknown product update provider", { productId: productId2 });
      const candidate = await entry.provider.getLatest({
        channel: entry.channel,
        currentVersion: entry.version,
        signal
      });
      if (!candidate) return Object.freeze({ status: "CURRENT" });
      const release = normalizeRelease(productId2, candidate);
      if (release.channel !== entry.channel) {
        throw new ContractError("Update provider crossed the selected release channel");
      }
      if ((0, import_semver2.compare)(release.version, entry.version) <= 0) return Object.freeze({ status: "CURRENT" });
      this.#notifications.upsert({
        actions: [
          {
            handler: () => entry.provider.update?.(release),
            label: "Update"
          },
          {
            handler: () => this.#notifications.dismiss(`update.${productId2}`),
            label: "Later"
          }
        ],
        bullets: release.summary,
        id: `update.${productId2}`,
        kind: "UPDATE_AVAILABLE",
        message: `${entry.name} ${release.version} is available.`,
        priority: "NORMAL",
        title: "Update available"
      });
      return Object.freeze({ release, status: "AVAILABLE" });
    }
    recordInstalled({ productId: productId2, name, version, channel, summary }) {
      const release = normalizeRelease(productId2, { channel, summary, version });
      this.#installed.set(productId2, release);
      this.#notifications.dismiss(`update.${productId2}`);
      this.#notifications.upsert({
        actions: [
          {
            handler: () => this.#notifications.dismiss(`post-update.${productId2}`),
            label: "Got It"
          }
        ],
        bullets: release.summary,
        id: `post-update.${productId2}`,
        kind: "POST_UPDATE",
        message: `${name} was updated to ${version}.`,
        priority: "LOW",
        title: "What's New"
      });
      return release;
    }
    whatsNew(productId2) {
      return this.#installed.get(productId2) ?? null;
    }
  };

  // ../fl-tools-core/src/storage/account-scope.js
  function deriveAccountIdentity(document) {
    if (!document?.querySelectorAll) return null;
    const ids = new Set(
      [...document.querySelectorAll(SELECTORS.currentAccount.join(","))].map((node) => node.getAttribute(CURRENT_ACCOUNT_ATTRIBUTE)?.trim()).filter((value) => /^\d+$/.test(value))
    );
    if (ids.size !== 1) return null;
    return [...ids][0];
  }
  var AccountScope = class {
    #accountId = null;
    #controller = new AbortController();
    #generation = 0;
    #onChange;
    constructor({ accountId = null, onChange } = {}) {
      this.#onChange = onChange;
      if (accountId !== null) this.#validate(accountId);
      this.#accountId = accountId;
    }
    get accountId() {
      return this.#accountId;
    }
    get signal() {
      return this.#controller.signal;
    }
    capture() {
      if (!this.#accountId) {
        throw new StorageError("Account-scoped persistence requires a reliable account identity", {
          code: "STORAGE_ACCOUNT_AMBIGUOUS"
        });
      }
      return Object.freeze({ accountId: this.#accountId, generation: this.#generation });
    }
    assertCurrent(token) {
      if (!token || token.accountId !== this.#accountId || token.generation !== this.#generation || this.#controller.signal.aborted) {
        throw new StorageError("Account changed before persistent work completed", {
          code: "STORAGE_ACCOUNT_STALE"
        });
      }
    }
    refresh(document) {
      return this.set(deriveAccountIdentity(document));
    }
    set(accountId) {
      if (accountId !== null) this.#validate(accountId);
      if (accountId === this.#accountId) return false;
      const previousAccountId = this.#accountId;
      this.#controller.abort(new globalThis.DOMException("Account scope changed", "AbortError"));
      this.#controller = new AbortController();
      this.#generation += 1;
      this.#accountId = accountId;
      this.#onChange?.({ accountId, previousAccountId, generation: this.#generation });
      return true;
    }
    #validate(accountId) {
      if (typeof accountId !== "string" || accountId.length === 0) {
        throw new ContractError("Account id must be a non-empty string or null");
      }
    }
  };

  // ../fl-tools-core/src/storage/constants.js
  var DATABASE_NAME = "FLTools";
  var DATABASE_VERSION = 1;
  var STORE_NAMES = Object.freeze([
    "meta",
    "settings",
    "people",
    "history",
    "watches",
    "social",
    "vault"
  ]);
  var ACCOUNT_STORES = Object.freeze(
    /* @__PURE__ */ new Set(["settings", "people", "history", "watches", "social", "vault"])
  );
  var BROWSE_SETTINGS_KEY = "browse";

  // ../fl-tools-core/src/storage/import-previous-database.js
  var PREVIOUS_DATABASE_NAME = "FLToolsV3";
  var MARKER = "migration:unversioned-database";
  function result2(request) {
    return new Promise((resolve2, reject) => {
      request.onsuccess = () => resolve2(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  function openExisting(factory) {
    return new Promise((resolve2, reject) => {
      const request = factory.open(PREVIOUS_DATABASE_NAME);
      let absent = false;
      request.onupgradeneeded = () => {
        absent = true;
        request.transaction.abort();
      };
      request.onsuccess = () => resolve2(request.result);
      request.onerror = () => absent ? resolve2(null) : reject(request.error);
    });
  }
  async function importPreviousDatabase(factory, destination2) {
    if (await destination2.get("meta", MARKER)) return;
    const source = await openExisting(factory);
    const records = {};
    try {
      if (source) {
        if (source.version > DATABASE_VERSION)
          throw new Error("Previous database schema is newer than this Core understands");
        const names = STORE_NAMES.filter((name) => source.objectStoreNames.contains(name));
        if (names.length) {
          const transaction = source.transaction(names, "readonly");
          await Promise.all(
            names.map(async (name) => {
              records[name] = await result2(transaction.objectStore(name).getAll());
            })
          );
        }
      }
    } finally {
      source?.close();
    }
    await destination2.atomic(STORE_NAMES, async (stores, requestResult2) => {
      if (await requestResult2(stores.meta.get(MARKER))) return;
      for (const [name, rows] of Object.entries(records)) {
        for (const record of rows) {
          if (name === "meta" && record.key === MARKER) continue;
          if (await requestResult2(stores[name].get(record.key)) === void 0) {
            await requestResult2(stores[name].put(record));
          }
        }
      }
      await requestResult2(stores.meta.put({ key: MARKER, completed: true }));
    });
  }

  // ../fl-tools-core/src/storage/database.js
  function requestResult(request) {
    return new Promise((resolve2, reject) => {
      request.addEventListener("success", () => resolve2(request.result), { once: true });
      request.addEventListener("error", () => reject(request.error), { once: true });
    });
  }
  function transactionDone(transaction) {
    return new Promise((resolve2, reject) => {
      transaction.addEventListener("complete", () => resolve2(), { once: true });
      transaction.addEventListener(
        "abort",
        () => reject(
          transaction.error ?? new globalThis.DOMException("Transaction aborted", "AbortError")
        ),
        { once: true }
      );
      transaction.addEventListener("error", () => reject(transaction.error), { once: true });
    });
  }
  var StorageDatabase = class {
    #database;
    #factory;
    #migration;
    #name;
    #version;
    constructor({
      indexedDB = globalThis.indexedDB,
      migration,
      name = DATABASE_NAME,
      version = DATABASE_VERSION
    } = {}) {
      if (!indexedDB?.open) {
        throw new StorageError("IndexedDB is unavailable", { code: "STORAGE_UNAVAILABLE" });
      }
      this.#factory = indexedDB;
      this.#migration = migration;
      this.#name = name;
      this.#version = version;
    }
    get name() {
      return this.#name;
    }
    async open() {
      if (this.#database) return this;
      const request = this.#factory.open(this.#name, this.#version);
      let upgradeError;
      request.addEventListener("upgradeneeded", (event) => {
        const transaction = request.transaction;
        try {
          for (const storeName of STORE_NAMES) {
            if (!request.result.objectStoreNames.contains(storeName)) {
              request.result.createObjectStore(storeName, { keyPath: "key" });
            }
          }
          this.#migration?.({
            database: request.result,
            newVersion: event.newVersion,
            oldVersion: event.oldVersion,
            transaction
          });
          for (const storeName of STORE_NAMES) {
            if (!request.result.objectStoreNames.contains(storeName)) {
              throw new Error(`Missing required store: ${storeName}`);
            }
          }
        } catch (error) {
          upgradeError = error;
          transaction.abort();
        }
      });
      try {
        this.#database = await requestResult(request);
        this.#database.addEventListener("versionchange", () => this.close());
        if (this.#name === DATABASE_NAME) await importPreviousDatabase(this.#factory, this);
        return this;
      } catch (error) {
        this.close();
        const tooNew = error?.name === "VersionError";
        throw new StorageError(
          tooNew ? "Stored schema is newer than this Core understands" : "FL Tools storage could not open",
          {
            cause: upgradeError ?? error,
            code: tooNew ? "STORAGE_SCHEMA_TOO_NEW" : "STORAGE_RECOVERY_REQUIRED"
          }
        );
      }
    }
    close() {
      this.#database?.close();
      this.#database = void 0;
    }
    async get(storeName, key) {
      this.#assertStore(storeName);
      const transaction = this.#database.transaction(storeName, "readonly");
      return requestResult(transaction.objectStore(storeName).get(key));
    }
    async getAll(storeName) {
      this.#assertStore(storeName);
      const transaction = this.#database.transaction(storeName, "readonly");
      return requestResult(transaction.objectStore(storeName).getAll());
    }
    async put(storeName, record) {
      return this.atomic(storeName, async (store) => {
        await requestResult(store.put(record));
        return record;
      });
    }
    async delete(storeName, key) {
      return this.atomic(storeName, async (store) => {
        await requestResult(store.delete(key));
      });
    }
    async atomic(storeNames, operation) {
      const names = Array.isArray(storeNames) ? storeNames : [storeNames];
      for (const name of names) this.#assertStore(name);
      const transaction = this.#database.transaction(names, "readwrite");
      const stores = Object.fromEntries(names.map((name) => [name, transaction.objectStore(name)]));
      try {
        const result3 = await operation(names.length === 1 ? stores[names[0]] : stores, requestResult);
        await transactionDone(transaction);
        return result3;
      } catch (error) {
        if (transaction.readyState !== "done") {
          try {
            transaction.abort();
          } catch {
          }
        }
        throw error;
      }
    }
    #assertStore(storeName) {
      if (!this.#database) throw new ContractError("Storage database is not open");
      if (!STORE_NAMES.includes(storeName))
        throw new ContractError("Unknown storage domain", { storeName });
    }
  };

  // ../fl-tools-core/src/storage/legacy-registry.js
  var NAMESPACED_LAYOUT = Object.freeze({
    basic: ["seen", "presets", "filters", "display", "kinks", "terms", "blocks"],
    core: ["settings", "metadata"],
    pro: [
      "notes",
      "mutes",
      "snoozes",
      "pins",
      "visits",
      "watches",
      "highlighter",
      "whitelist",
      "compare",
      "paranoid",
      "shortcuts",
      "limits"
    ],
    studio: [
      "workspaces",
      "timeline",
      "audit",
      "secure_notes",
      "vault",
      "history",
      "undo",
      "facts",
      "rules",
      "followers"
    ],
    vault: ["profiles", "media", "jobs", "settings", "index", "diagnostics"]
  });
  var REGISTERED_LOCAL_KEYS = [
    "fl_perf_settings",
    "fl_settings_schema_version",
    "fl_seen_today",
    "fl_filter_presets",
    "fl_profile_filter_settings",
    "fl_profile_filter_settings_v3",
    "fl_profile_filter_settings_v2",
    "fl_display_settings",
    "fl_own_kinks",
    "fl_term_library",
    "fl_block_reasons",
    "fl_nick_notes",
    "fl_feed_mutes",
    "fl_snooze",
    "fl_profile_pins",
    "fl_visit_log",
    "fl_profile_watches",
    "fl_card_highlighter_settings",
    "fl_whitelist",
    "fl_profile_snapshots",
    "fl_paranoid",
    "fl_tools_pro_shortcuts",
    "fl_limit_history",
    "fl_tools_studio_workspaces",
    "fl_studio_timeline",
    "fl_studio_audit",
    "fl_studio_vault",
    "fl_studio_history",
    "fl_studio_undo",
    "fl_studio_profile_facts",
    "fl_studio_rules",
    "fl_studio_follower_counts",
    "fl_studio_watches",
    "fl_tools_basic_shortcuts",
    "fl_tools_basic_update_check",
    "fl_tools_grid_anchor_top_v3",
    "fl_tools_pro_update_check",
    "fl_dock_top",
    "fl_settings_launcher_top",
    "fl_panel_collapsed",
    "fl_dock_open_panel",
    "fl_last_place",
    "fl_skip_block_prompt",
    "fl_filter_preset",
    "fl_pro_start_min_v",
    "fl_pro_theme_settings",
    "fl_crypto_vault_enabled",
    "fl_crypto_vault_salt",
    "fl_crypto_vault_verifier",
    "fl_vault_launcher_top",
    "fl_tools_vault_records",
    "fl_tools_vault_records_schedule",
    "fl_tools_vault_records_visited",
    "fl_tools_vault_records_sync",
    "fl_tools_vault_records_limit",
    "fl_tools_vault_records_auto_offload",
    "fl_tools_vault_records_queue",
    "fl_tools_vault_records_theme_settings",
    "fl_tools_vault_records_scope"
  ];
  var SESSION_KEYS = [
    "fl_private_session",
    "fl_tools_claim",
    "fl_home_scroll_map",
    "fl_markup_warn_session",
    "fl_read_stories_session",
    "fl_limit_hit_session",
    "fl_similar_seed",
    "fl_vault_session",
    "fls_vault_pass",
    "fls_vault_unlocked"
  ];
  var namespaced = Object.entries(NAMESPACED_LAYOUT).flatMap(
    ([scope, slots]) => slots.map((slot) => `fl.${scope}.${slot}`)
  );
  var LEGACY_LOCAL_KEYS = Object.freeze(
    [.../* @__PURE__ */ new Set([...REGISTERED_LOCAL_KEYS, ...namespaced])].sort()
  );
  var LEGACY_SESSION_KEYS = Object.freeze([...SESSION_KEYS].sort());
  function isLegacyDynamicLocalKey(key) {
    const prefix = "fl_tools_vault_records_profile_schedule_";
    if (!key.startsWith(prefix)) return false;
    const encoded = key.slice(prefix.length);
    if (!encoded || encoded.length > 2048) return false;
    try {
      const url = new URL(decodeURIComponent(encoded));
      return url.protocol === "https:" && url.hostname === "fetlife.com" && /^\/[^/]+\/?$/.test(url.pathname);
    } catch {
      return false;
    }
  }

  // ../fl-tools-core/src/storage/legacy-cleanup.js
  function defaultId2() {
    return crypto.randomUUID();
  }
  function keysIn(storage) {
    const keys = [];
    if (!storage) return keys;
    for (let index = 0; index < storage.length; index += 1) {
      const key = storage.key(index);
      if (key !== null) keys.push(key);
    }
    return keys;
  }
  var LegacyCleanup = class {
    #clock;
    #database;
    #detection;
    #idFactory;
    #localStorage;
    #sessionStorage;
    constructor({ database, localStorage, sessionStorage, clock = Date.now, idFactory = defaultId2 }) {
      if (!database) throw new ContractError("Legacy cleanup database is required");
      this.#database = database;
      this.#localStorage = localStorage;
      this.#sessionStorage = sessionStorage;
      this.#clock = clock;
      this.#idFactory = idFactory;
    }
    scan() {
      const localAllowed = new Set(LEGACY_LOCAL_KEYS);
      const sessionAllowed = new Set(LEGACY_SESSION_KEYS);
      const local = keysIn(this.#localStorage).filter(
        (key) => localAllowed.has(key) || isLegacyDynamicLocalKey(key)
      );
      const session = keysIn(this.#sessionStorage).filter((key) => sessionAllowed.has(key));
      const confirmationToken = this.#idFactory();
      this.#detection = Object.freeze({
        confirmationToken,
        found: local.length + session.length > 0,
        local: Object.freeze(local.sort()),
        session: Object.freeze(session.sort())
      });
      return this.#detection;
    }
    async confirmAndDelete(confirmationToken) {
      if (!this.#detection || confirmationToken !== this.#detection.confirmationToken) {
        throw new ContractError("Explicit legacy cleanup confirmation is required");
      }
      const targets = this.#detection;
      for (const key of targets.local) {
        try {
          this.#localStorage?.removeItem(key);
        } catch {
        }
      }
      for (const key of targets.session) {
        try {
          this.#sessionStorage?.removeItem(key);
        } catch {
        }
      }
      const remaining = [
        ...targets.local.filter((key) => this.#stillExists(this.#localStorage, key)),
        ...targets.session.filter((key) => this.#stillExists(this.#sessionStorage, key))
      ];
      if (remaining.length > 0) {
        throw new StorageError("Legacy cleanup could not be verified", {
          code: "STORAGE_LEGACY_CLEANUP_FAILED",
          details: { remaining }
        });
      }
      await this.#database.put("meta", {
        deletedCount: targets.local.length + targets.session.length,
        key: "legacy-cleanup",
        schemaVersion: 1,
        status: "complete",
        updatedAt: this.#clock()
      });
      this.#detection = void 0;
      return Object.freeze({
        deletedCount: targets.local.length + targets.session.length,
        verified: true
      });
    }
    #stillExists(storage, key) {
      try {
        return storage?.getItem(key) !== null;
      } catch {
        return true;
      }
    }
  };

  // ../fl-tools-core/src/storage/lease.js
  function defaultId3() {
    return crypto.randomUUID();
  }
  var StorageLease = class {
    #clock;
    #database;
    #idFactory;
    #ownerId;
    constructor({ database, clock = Date.now, idFactory = defaultId3, ownerId = idFactory() }) {
      if (!database || typeof ownerId !== "string")
        throw new ContractError("Lease dependencies are required");
      this.#database = database;
      this.#clock = clock;
      this.#idFactory = idFactory;
      this.#ownerId = ownerId;
    }
    async acquire(name, durationMs) {
      this.#assert(name, durationMs);
      const key = `lease:${name}`;
      const now = this.#clock();
      return this.#database.atomic("meta", async (store, request) => {
        const current = await request(store.get(key));
        if (current && current.ownerId !== this.#ownerId && current.expiresAt > now) {
          return Object.freeze({ acquired: false, expiresAt: current.expiresAt });
        }
        const lease = {
          expiresAt: now + durationMs,
          fencingToken: this.#idFactory(),
          key,
          ownerId: this.#ownerId,
          schemaVersion: 1,
          updatedAt: now
        };
        await request(store.put(lease));
        return Object.freeze({ acquired: true, ...lease });
      });
    }
    async renew(name, durationMs, fencingToken) {
      this.#assert(name, durationMs);
      const key = `lease:${name}`;
      const now = this.#clock();
      return this.#database.atomic("meta", async (store, request) => {
        const current = await request(store.get(key));
        if (!current || current.ownerId !== this.#ownerId || current.fencingToken !== fencingToken || current.expiresAt <= now) {
          return false;
        }
        await request(store.put({ ...current, expiresAt: now + durationMs, updatedAt: now }));
        return true;
      });
    }
    async release(name, fencingToken) {
      const key = `lease:${name}`;
      return this.#database.atomic("meta", async (store, request) => {
        const current = await request(store.get(key));
        if (!current || current.ownerId !== this.#ownerId || current.fencingToken !== fencingToken) {
          return false;
        }
        await request(store.delete(key));
        return true;
      });
    }
    #assert(name, durationMs) {
      if (typeof name !== "string" || name.length === 0 || !Number.isFinite(durationMs) || durationMs <= 0) {
        throw new ContractError("Lease name and positive duration are required");
      }
    }
  };

  // ../fl-tools-core/src/storage/schema.js
  var BROWSE_DEFAULTS = Object.freeze({
    feed: Object.freeze({}),
    filters: Object.freeze({}),
    infiniteScroll: Object.freeze({}),
    media: Object.freeze({}),
    navigation: Object.freeze({}),
    pageEnhancements: Object.freeze({}),
    preset: null,
    presets: Object.freeze({}),
    seen: Object.freeze({}),
    softBlock: Object.freeze({}),
    ui: Object.freeze({})
  });
  function isObject(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
  }
  function isBrowseValue(value) {
    if (!isObject(value)) return false;
    const allowed = new Set(Object.keys(BROWSE_DEFAULTS));
    if (Object.keys(value).some((key) => !allowed.has(key))) return false;
    return [
      "feed",
      "filters",
      "infiniteScroll",
      "media",
      "navigation",
      "pageEnhancements",
      "presets",
      "seen",
      "softBlock",
      "ui"
    ].every((key) => value[key] === void 0 || isObject(value[key])) && (value.preset === void 0 || value.preset === null || typeof value.preset === "string");
  }
  function isEnvelope(record, accountScoped) {
    return isObject(record) && typeof record.key === "string" && record.key.length > 0 && typeof record.recordKey === "string" && record.recordKey.length > 0 && Number.isInteger(record.revision) && record.revision >= 1 && record.schemaVersion === 1 && Number.isFinite(record.updatedAt) && (!accountScoped || typeof record.accountId === "string" && record.accountId.length > 0);
  }
  function validateRecord(storeName, record) {
    if (storeName === "meta") {
      return isObject(record) && typeof record.key === "string" && record.key.length > 0 && record.schemaVersion === 1 && Number.isFinite(record.updatedAt);
    }
    if (!isEnvelope(record, true) || !isObject(record.value)) return false;
    if (storeName === "settings") {
      return record.recordKey !== BROWSE_SETTINGS_KEY || isBrowseValue(record.value);
    }
    if (storeName === "people") {
      return typeof record.value.personId === "string" && !Array.isArray(record.value.history) && !Array.isArray(record.value.watchHistory);
    }
    if (storeName === "history") {
      return typeof record.value.personId === "string" && Number.isFinite(record.value.visitedAt);
    }
    if (storeName === "watches") return typeof record.value.personId === "string";
    if (storeName === "vault") {
      const forbidden = ["bytes", "blob", "data", "content"];
      return typeof record.value.contentId === "string" && isObject(record.value.entityIdentity) && typeof record.value.contentType === "string" && typeof record.value.relativePath === "string" && (typeof record.value.sourceIdentity === "string" || isObject(record.value.sourceIdentity)) && Number.isFinite(record.value.savedAt) && isObject(record.value.metadata) && ["string", "object"].includes(typeof record.value.deduplicationState) && record.value.deduplicationState !== null && ["string", "object"].includes(typeof record.value.acquisitionState) && record.value.acquisitionState !== null && forbidden.every((key) => !(key in record.value));
    }
    return storeName === "social";
  }
  function mergeBrowseSettings(overrides = {}) {
    if (!isBrowseValue(overrides)) return globalThis.structuredClone(BROWSE_DEFAULTS);
    const merged = globalThis.structuredClone(BROWSE_DEFAULTS);
    for (const [key, value] of Object.entries(overrides)) {
      merged[key] = isObject(value) ? { ...merged[key], ...value } : value;
    }
    return merged;
  }
  function isValidBrowseOverrides(value) {
    return isBrowseValue(value);
  }

  // ../fl-tools-core/src/storage/service.js
  var PORTABLE_STORES = Object.freeze(["settings", "people", "history", "watches"]);
  var MAX_PORTABLE_RECORDS = 1e4;
  function portableSettingsKey(recordKey) {
    return recordKey === BROWSE_SETTINGS_KEY || recordKey.startsWith("pro.");
  }
  function defaultId4() {
    return crypto.randomUUID();
  }
  var CoreStorage = class {
    #accountScope;
    #beforeCommit;
    #clock;
    #crossTab;
    #database;
    #events;
    #idFactory;
    constructor({
      accountScope,
      database,
      beforeCommit,
      clock = Date.now,
      crossTab,
      events,
      idFactory = defaultId4
    }) {
      if (!accountScope || !database) throw new ContractError("Storage dependencies are required");
      this.#accountScope = accountScope;
      this.#beforeCommit = beforeCommit;
      this.#clock = clock;
      this.#crossTab = crossTab;
      this.#database = database;
      this.#events = events;
      this.#idFactory = idFactory;
    }
    async open() {
      await this.#database.open();
      return this;
    }
    close() {
      this.#database.close();
    }
    async get(storeName, recordKey) {
      const token = this.#token(storeName);
      const key = this.#key(storeName, recordKey, token);
      const record = await this.#database.get(storeName, key);
      if (!record) return void 0;
      if (!validateRecord(storeName, record)) {
        await this.#isolate(storeName, key, record, "VALIDATION_FAILED");
        return void 0;
      }
      if (token) this.#accountScope.assertCurrent(token);
      return globalThis.structuredClone(record);
    }
    async list(storeName) {
      const token = this.#token(storeName);
      const records = await this.#database.getAll(storeName);
      const prefix = token ? `${token.accountId}:` : "";
      const valid3 = [];
      for (const record of records) {
        if (token && !record.key?.startsWith(prefix)) continue;
        if (validateRecord(storeName, record)) valid3.push(globalThis.structuredClone(record));
        else await this.#isolate(storeName, record.key, record, "VALIDATION_FAILED");
      }
      if (token) this.#accountScope.assertCurrent(token);
      return valid3;
    }
    async put(storeName, recordKey, value, { expectedRevision } = {}) {
      this.#assertDomain(storeName);
      const token = this.#token(storeName);
      const key = this.#key(storeName, recordKey, token);
      const now = this.#clock();
      const result3 = await this.#database.atomic(storeName, async (store, request) => {
        const current = await request(store.get(key));
        if (expectedRevision !== void 0 && (current?.revision ?? 0) !== expectedRevision) {
          throw new StorageConflictError("Stored record changed before this save", {
            actualRevision: current?.revision ?? 0,
            expectedRevision,
            recordKey,
            storeName
          });
        }
        const record = {
          accountId: token?.accountId,
          key,
          recordKey,
          revision: (current?.revision ?? 0) + 1,
          schemaVersion: 1,
          updatedAt: now,
          value: globalThis.structuredClone(value)
        };
        if (!validateRecord(storeName, record)) {
          throw new StorageError("Record failed schema validation", {
            code: "STORAGE_VALIDATION_FAILED",
            details: { recordKey, storeName }
          });
        }
        await this.#beforeCommit?.({ record, storeName, token });
        if (token) this.#accountScope.assertCurrent(token);
        await request(store.put(record));
        return record;
      });
      this.#publish(storeName, recordKey, result3.revision, "put");
      return globalThis.structuredClone(result3);
    }
    async delete(storeName, recordKey, { expectedRevision } = {}) {
      this.#assertDomain(storeName);
      const token = this.#token(storeName);
      const key = this.#key(storeName, recordKey, token);
      await this.#database.atomic(storeName, async (store, request) => {
        const current = await request(store.get(key));
        if (expectedRevision !== void 0 && (current?.revision ?? 0) !== expectedRevision) {
          throw new StorageConflictError("Stored record changed before this delete", {
            actualRevision: current?.revision ?? 0,
            expectedRevision,
            recordKey,
            storeName
          });
        }
        await this.#beforeCommit?.({ operation: "delete", storeName, token });
        if (token) this.#accountScope.assertCurrent(token);
        await request(store.delete(key));
      });
      this.#publish(storeName, recordKey, void 0, "delete");
    }
    async getBrowseSettings() {
      const record = await this.get("settings", BROWSE_SETTINGS_KEY);
      return mergeBrowseSettings(record?.value);
    }
    async setBrowseSettings(overrides) {
      if (!isValidBrowseOverrides(overrides)) {
        throw new StorageError("Browse settings overrides are invalid", {
          code: "STORAGE_VALIDATION_FAILED"
        });
      }
      return this.put("settings", BROWSE_SETTINGS_KEY, overrides);
    }
    async resetBrowseSettings() {
      await this.delete("settings", BROWSE_SETTINGS_KEY);
      return this.getBrowseSettings();
    }
    async appendHistory(value) {
      for (let attempt = 0; attempt < 5; attempt += 1) {
        const id = this.#idFactory();
        try {
          await this.put("history", id, value, { expectedRevision: 0 });
          return id;
        } catch (error) {
          if (error?.code !== "STORAGE_CONFLICT") throw error;
        }
      }
      throw new StorageError("Could not allocate a unique History record id", {
        code: "STORAGE_ID_COLLISION"
      });
    }
    async saveWatchSnapshot(personId, snapshot, fingerprint2) {
      if (!fingerprint2 || typeof fingerprint2 !== "string") {
        throw new ContractError("Watch snapshot fingerprint is required");
      }
      const token = this.#accountScope.capture();
      const stateRecordKey = `state:${personId}`;
      const stateKey = this.#key("watches", stateRecordKey, token);
      const now = this.#clock();
      const result3 = await this.#database.atomic("watches", async (store, request) => {
        const current = await request(store.get(stateKey));
        if (current?.value.fingerprint === fingerprint2) return { changed: false };
        const changeId = `change:${this.#idFactory()}`;
        const changeRecord = {
          accountId: token.accountId,
          key: this.#key("watches", changeId, token),
          recordKey: changeId,
          revision: 1,
          schemaVersion: 1,
          updatedAt: now,
          value: { fingerprint: fingerprint2, observedAt: now, personId, snapshot }
        };
        if (await request(store.get(changeRecord.key))) {
          throw new StorageError("Watch change id collision", { code: "STORAGE_ID_COLLISION" });
        }
        const stateRecord = {
          accountId: token.accountId,
          key: stateKey,
          recordKey: stateRecordKey,
          revision: (current?.revision ?? 0) + 1,
          schemaVersion: 1,
          updatedAt: now,
          value: { fingerprint: fingerprint2, personId, snapshot }
        };
        await this.#beforeCommit?.({ record: stateRecord, storeName: "watches", token });
        this.#accountScope.assertCurrent(token);
        await request(store.put(changeRecord));
        await request(store.put(stateRecord));
        return { changeId, changed: true, revision: stateRecord.revision };
      });
      if (result3.changed) {
        this.#publish("watches", result3.changeId, 1, "put");
        this.#publish("watches", stateRecordKey, result3.revision, "put");
      }
      return Object.freeze({ changeId: result3.changeId, changed: result3.changed });
    }
    async replacePortableAccountData(data) {
      if (!data || typeof data !== "object" || Array.isArray(data)) {
        throw new StorageError("Portable account data is invalid", {
          code: "STORAGE_VALIDATION_FAILED"
        });
      }
      const token = this.#accountScope.capture();
      const now = this.#clock();
      const prepared = {};
      let total = 0;
      for (const storeName of PORTABLE_STORES) {
        const entries = data[storeName];
        if (!Array.isArray(entries)) {
          throw new StorageError("Portable account data is incomplete", {
            code: "STORAGE_VALIDATION_FAILED"
          });
        }
        const seen = /* @__PURE__ */ new Set();
        prepared[storeName] = entries.map((entry) => {
          if (!entry || typeof entry !== "object" || Array.isArray(entry) || typeof entry.recordKey !== "string" || entry.recordKey.length === 0 || entry.recordKey.length > 500 || seen.has(entry.recordKey) || storeName === "settings" && !portableSettingsKey(entry.recordKey)) {
            throw new StorageError("Portable record identity is invalid", {
              code: "STORAGE_VALIDATION_FAILED"
            });
          }
          seen.add(entry.recordKey);
          const record = {
            accountId: token.accountId,
            key: `${token.accountId}:${entry.recordKey}`,
            recordKey: entry.recordKey,
            revision: 1,
            schemaVersion: 1,
            updatedAt: now,
            value: globalThis.structuredClone(entry.value)
          };
          if (!validateRecord(storeName, record)) {
            throw new StorageError("Portable record failed schema validation", {
              code: "STORAGE_VALIDATION_FAILED"
            });
          }
          return record;
        });
        total += entries.length;
      }
      if (Object.keys(data).some((key) => !PORTABLE_STORES.includes(key))) {
        throw new StorageError("Portable account data contains an unknown domain", {
          code: "STORAGE_VALIDATION_FAILED"
        });
      }
      if (total > MAX_PORTABLE_RECORDS) {
        throw new StorageError("Portable account data contains too many records", {
          code: "STORAGE_IMPORT_TOO_LARGE"
        });
      }
      const changed = Object.fromEntries(PORTABLE_STORES.map((storeName) => [storeName, /* @__PURE__ */ new Set()]));
      await this.#database.atomic(PORTABLE_STORES, async (stores, request) => {
        for (const storeName of PORTABLE_STORES) {
          const current = await request(stores[storeName].getAll());
          for (const record of current) {
            if (record.accountId === token.accountId && (storeName !== "settings" || portableSettingsKey(record.recordKey))) {
              changed[storeName].add(record.recordKey);
              await request(stores[storeName].delete(record.key));
            }
          }
          for (const record of prepared[storeName]) {
            changed[storeName].add(record.recordKey);
            await this.#beforeCommit?.({ record, storeName, token });
            this.#accountScope.assertCurrent(token);
            await request(stores[storeName].put(record));
          }
        }
        this.#accountScope.assertCurrent(token);
      });
      for (const [storeName, keys] of Object.entries(changed)) {
        for (const recordKey of keys) this.#publish(storeName, recordKey, 1, "replace");
      }
      return Object.freeze({ records: total, stores: Object.freeze([...PORTABLE_STORES]) });
    }
    async #isolate(storeName, key, record, reason) {
      const existing = (await this.#database.getAll("meta")).find(
        (entry) => entry.originalKey === key && entry.storeName === storeName
      );
      const quarantineKey = existing?.key ?? `quarantine:${this.#idFactory()}`;
      await this.#database.put("meta", {
        key: quarantineKey,
        originalKey: key,
        rawRecord: record,
        reason,
        schemaVersion: 1,
        storeName,
        updatedAt: this.#clock()
      });
      this.#events?.emit("storage:invalid-record", { key, quarantineKey, reason, storeName });
    }
    #token(storeName) {
      this.#assertDomain(storeName);
      return ACCOUNT_STORES.has(storeName) ? this.#accountScope.capture() : null;
    }
    #key(storeName, recordKey, token) {
      if (typeof recordKey !== "string" || recordKey.length === 0) {
        throw new ContractError("Storage record key is required");
      }
      return ACCOUNT_STORES.has(storeName) ? `${token.accountId}:${recordKey}` : recordKey;
    }
    #assertDomain(storeName) {
      if (!STORE_NAMES.includes(storeName))
        throw new ContractError("Unknown storage domain", { storeName });
    }
    #publish(storeName, recordKey, revision, operation) {
      if (!this.#crossTab) return;
      this.#crossTab.publish(
        "storage-invalidated",
        { operation, recordKey, revision, storeName },
        { scope: storeName === "meta" ? "core" : "account" }
      );
    }
  };

  // ../fl-tools-core/src/ui/help.js
  var CONTROL_HELP = Object.freeze({
    Diagnostics: "Inspect or export page and plugin diagnostics, and access this product\u2019s data maintenance controls.",
    "Reduce Motion": "Disable FL Tools animation and transitions. Operating system reduced-motion preferences still apply.",
    Notifications: "Show or hide noncritical FL Tools notices on this browser and site.",
    "Menu theme": "Choose the shared visual theme used by every FL Tools menu on this page.",
    "Picture threshold": "Highlight known picture counts below this number when the Pictures rule is enabled.",
    "Video threshold": "Highlight known video counts below this number when the Videos rule is enabled. Zero disables the low-count match.",
    "Writing threshold": "Highlight known writing counts below this number when the Writings rule is enabled. Zero disables the low-count match.",
    "Minimum pictures": "Require at least this many source-reported pictures. Leave blank to ignore picture count.",
    "Minimum videos": "Require at least this many source-reported videos. Leave blank to ignore video count.",
    "Minimum writings": "Require at least this many source-reported writings. Leave blank to ignore writing count.",
    "Maximum additional pages (1\u201320)": "Stop automatic loading after this many additional native pages during the current traversal.",
    "Blur strength (1\u201310)": "Choose the blur strength applied to media in Blur presentation mode.",
    "Seen profile presentation": "Choose whether previously visited profiles stay normal, dim, or disappear from supported card lists.",
    "Soft-blocked profiles": "Hide or dim people you have locally Soft Blocked. Native FetLife blocks remain separate.",
    "Media presentation": "Show, blur, or hide supported media already loaded on the page.",
    "Appearance and accessibility": "Control spacing, contrast, menu width, system notices, and default launcher placement.",
    "Fixed shortcuts": "Open the book button beside Close to review FL Tools and native FetLife shortcuts.",
    Reset: "Restore Browse defaults. Other product data is not removed by this action.",
    "Group name contains": "Filter only the loaded native Groups whose names contain this text.",
    "Event name contains": "Filter only the loaded native Events whose names contain this text.",
    "Source location contains": "Match the location text supplied by the event; no external location lookup is performed.",
    "Creator name or stable ID": "Search creators in the local Vault catalog; this does not search FetLife.",
    "Saved since (YYYY-MM-DD)": "Limit the Vault catalog to items saved on or after this date.",
    "Reindex Vault": "Check the chosen destination for committed saves and recovery evidence. Does not import arbitrary files or delete bytes.",
    Filters: "Filter visible profile cards using age, role, location, content counts, and term chips.",
    Highlighter: "Highlight cards with verified low content counts, relationships, or an explicit People selection.",
    People: "Search local People records by name, ID, or private note, then open a result for its actions.",
    "Soft Block": "Manage locally blocked people by name or numeric profile ID, then choose Hide or Dim. Native FetLife Block remains separate.",
    Media: "Show, blur, or hide loaded media, adjust blur strength, or temporarily reveal native presentation.",
    Seen: "Control indicators and presentation for profiles visited by this account.",
    Advanced: "Automatic next-page loading and reversible page enhancements.",
    Personalize: "Private Session, Themes swatches, menu width, launcher placement, and keyboard shortcuts.",
    Themes: "Choose a site and menu color theme. Site Default leaves the native site theme unchanged.",
    System: "Review page and plugin health, export diagnostics, and use product maintenance actions.",
    Settings: "Product maintenance and page/plugin diagnostics export.",
    Groups: "Filter loaded native Groups by name, membership, and source-reported activity.",
    Events: "Filter loaded native Events by name, source location, dates, and attendance mode.",
    Saved: "Open or remove your locally saved Group and Event references.",
    Library: "Search the local saved-content catalog; remove catalog entries or deliberately delete saved files.",
    Save: "Select qualified content already loaded on this page and review it before saving.",
    "Minimum age": "Exclude known ages below this value. Leave blank for no lower bound.",
    "Maximum age": "Exclude known ages above this value. Leave blank for no upper bound.",
    "Match criteria": "AND requires every selected criterion; OR accepts any selected criterion. Hard limits still take priority.",
    "Nonmatching profiles": "Hide removes nonmatches from the page layout; Dim keeps them visible for review.",
    "Role matching": "Required rejects known role mismatches; Preferred does not reject them.",
    "Profile card": "Include visible profile-card text when evaluating term chips.",
    Tags: "Include parsed tag text when evaluating term chips.",
    Nickname: "Include the displayed nickname when evaluating term chips.",
    "Include terms": "Match at least one active term in the selected fields. Add with Enter or comma; remove with \xD7.",
    "Exclude terms": "Reject cards matching any active term in the selected fields. Saved chips can be reused.",
    "Hard limits": "Matching terms take priority over other filters. On supported profile pages, a match offers local Soft Block or the native FetLife Block flow.",
    Pictures: "Highlight profiles with a verified picture count below the configured threshold.",
    Videos: "Highlight profiles with a verified video count below the configured threshold.",
    Writings: "Highlight profiles with a verified writing count below the configured threshold.",
    Friends: "Use the friend relationship reported by the page; unknown relationships are not assumed.",
    "Follows you": "Use the follows-you relationship reported by the page; unknown relationships are not assumed.",
    Following: "Use the following relationship reported by the page; unknown relationships are not assumed.",
    "Blur avatars in SFW": "Include loaded avatar images in SFW blurring.",
    "Blur videos in SFW": "Include loaded video media in SFW blurring.",
    "Show Seen indicators": "Show an indicator on supported cards for profiles already visited by this account.",
    "Auto Page Load": "Load the native next page near the bottom, including FetLife numbered and Next links, up to the configured additional-page limit.",
    "Infinite Scroll": "Load native next pages near the bottom, up to the configured limit.",
    "Page Enhancements": "Reversible changes to supported native links, timestamps, interests, banners, and picture navigation.",
    "Visited profile styling": "Mark links to profiles recorded in this account\u2019s local Seen history.",
    "Exact timestamps": "Show an exact time where the page provides a parseable source timestamp.",
    "Shared interests": "Emphasize shared-interest information supplied by the page.",
    "Hide banners": "Hide recognized promotional banners without removing native navigation.",
    "Picture navigation": "Add next-picture navigation where a native next-picture destination is available.",
    "Compact layout": "Reduce spacing in plugin controls without fixing row heights.",
    "High contrast": "Increase contrast for plugin surfaces and boundaries.",
    "Menu width": "Choose Full, Compact, or Narrow plugin menu width. Other FL Tools menus on this page follow the same width.",
    "Update and system notifications": "Show product update and system notices.",
    "Launcher side": "Launchers stay docked to the right edge and can move vertically.",
    "Reduce motion": "Reduce interface animations and transitions.",
    "Compact dock": "Use a narrower launcher arrangement.",
    "Hide Pro dock launcher": "Hide the Pro launcher; use the configured interface shortcut to restore it.",
    "Show Quieted cards dimmed": "Keep Quieted people visible but dimmed instead of hiding their cards.",
    "Joined groups only": "Keep Groups whose native source confirms your membership.",
    "Has source-reported new activity": "Keep Groups with new activity explicitly reported by the native page.",
    "Search People": "Search local names, IDs, and private notes. No names are listed until you enter a search.",
    "Select all qualified items in this loaded scope": "Select supported items already loaded here. This does not crawl other pages or start a save."
  });
  function attachHelp(element, description) {
    if (!description) return;
    element.dataset.fltTip = description;
    element.setAttribute("aria-description", description);
  }
  var HelpTooltips = class {
    #document;
    #abort;
    #tip;
    constructor(document) {
      this.#document = document;
    }
    ensureMounted() {
      if (this.#tip && !this.#tip.isConnected && this.#document.body) {
        this.#document.body.append(this.#tip);
      }
    }
    start() {
      if (this.#tip) {
        this.ensureMounted();
        return;
      }
      const document = this.#document;
      const view = document.defaultView;
      this.#abort = new view.AbortController();
      const options = { signal: this.#abort.signal };
      const tip = document.createElement("div");
      tip.className = "flt-root flt-help-tooltip";
      tip.setAttribute("role", "tooltip");
      tip.hidden = true;
      this.#tip = tip;
      document.body.append(tip);
      const hide = () => {
        tip.hidden = true;
      };
      const show = (event) => {
        const target = event.target.closest?.("[data-flt-tip]");
        if (!target || target.classList.contains("flt-card-chip") || !target.closest(".flt-root")) {
          hide();
          return;
        }
        if (!tip.isConnected) document.body.append(tip);
        tip.textContent = target.dataset.fltTip;
        tip.hidden = false;
        const rect = target.getBoundingClientRect();
        const box = tip.getBoundingClientRect();
        tip.style.left = `${Math.max(8, Math.min(rect.left, view.innerWidth - box.width - 8))}px`;
        tip.style.top = `${Math.max(8, rect.bottom + box.height + 8 < view.innerHeight ? rect.bottom + 6 : rect.top - box.height - 6)}px`;
      };
      for (const type of ["pointerover", "focusin"]) document.addEventListener(type, show, options);
      for (const type of ["pointerout", "focusout", "pointerdown"])
        document.addEventListener(type, hide, options);
      document.addEventListener("scroll", hide, { ...options, capture: true });
      document.addEventListener(
        "keydown",
        (event) => {
          if (event.key === "Escape") hide();
        },
        options
      );
    }
    stop() {
      this.#abort?.abort();
      this.#tip?.remove();
    }
  };

  // ../fl-tools-core/src/ui/shared-preferences.js
  var KEY = "fl-tools.ui-preferences";
  var defaults = {
    reduceMotion: false,
    notifications: true,
    menuWidth: "full",
    themeSkin: "default"
  };
  function normalize(value = {}) {
    return {
      reduceMotion: value?.reduceMotion === true,
      notifications: value?.notifications !== false,
      menuWidth: ["full", "compact", "narrow"].includes(value?.menuWidth) ? value.menuWidth : "full",
      themeSkin: ["gradient", "pride"].includes(value?.themeSkin) ? "pride" : "default"
    };
  }
  var SharedPreferences = class {
    #document;
    #controls;
    #apply;
    #value;
    #views = /* @__PURE__ */ new Set();
    #stored = false;
    #storageListener;
    constructor({ document, controls, apply }) {
      this.#document = document;
      this.#controls = controls;
      this.#apply = apply;
      this.#value = { ...defaults };
      try {
        const raw = document.defaultView.localStorage.getItem(KEY);
        if (raw) {
          this.#value = normalize(JSON.parse(raw));
          this.#stored = true;
        }
      } catch {
      }
      this.#storageListener = (event) => {
        if (event.key !== KEY && event.key !== null) return;
        try {
          this.#value = normalize(event.newValue ? JSON.parse(event.newValue) : defaults);
          this.#stored = Boolean(event.newValue);
          this.apply();
        } catch {
        }
      };
      document.defaultView?.addEventListener("storage", this.#storageListener);
    }
    get value() {
      return { ...this.#value };
    }
    adopt(value) {
      if (!this.#stored) {
        this.#value = normalize({ ...this.#value, ...value });
        this.#save();
        this.apply();
      }
    }
    #save() {
      this.#stored = true;
      try {
        this.#document.defaultView.localStorage.setItem(KEY, JSON.stringify(this.#value));
        this.#stored = true;
        return true;
      } catch {
        return false;
      }
    }
    apply() {
      this.#document.documentElement.classList.toggle("flt-reduce-motion", this.#value.reduceMotion);
      this.#apply(this.value);
      for (const view of this.#views) view.refresh();
    }
    mount() {
      const root = this.#document.createElement("div");
      root.className = "flt-appearance-settings";
      const status = this.#document.createElement("p");
      status.setAttribute("role", "status");
      const fields = [];
      const change = (key, value) => {
        this.#value = normalize({ ...this.#value, [key]: value });
        const saved = this.#save();
        this.apply();
        status.textContent = saved ? "Saved for all FL Tools menus." : "Applied for this page; browser storage is unavailable.";
      };
      for (const [key, label] of [
        ["reduceMotion", "Reduce Motion"],
        ["notifications", "Notifications"]
      ]) {
        const control = this.#controls.toggle({
          label,
          checked: this.#value[key],
          onChange: (value) => change(key, value)
        });
        root.append(control.element);
        fields.push(
          () => control.element.querySelector('[role="switch"]').setAttribute("aria-checked", String(this.#value[key]))
        );
      }
      for (const [key, label, options] of [
        [
          "themeSkin",
          "Menu theme",
          [
            ["default", "Default"],
            ["pride", "Pride"]
          ]
        ],
        [
          "menuWidth",
          "Menu width",
          [
            ["full", "Full"],
            ["compact", "Compact"],
            ["narrow", "Narrow"]
          ]
        ]
      ]) {
        const field = this.#document.createElement("label");
        field.className = "flt-field";
        const text2 = this.#document.createElement("span");
        text2.className = "flt-label";
        text2.textContent = label;
        const select2 = this.#document.createElement("select");
        select2.className = "flt-input";
        attachHelp(text2, CONTROL_HELP[label]);
        attachHelp(select2, CONTROL_HELP[label]);
        for (const [value, label2] of options) {
          const option = this.#document.createElement("option");
          option.value = value;
          option.textContent = label2;
          select2.append(option);
        }
        select2.value = this.#value[key];
        select2.addEventListener("change", () => change(key, select2.value));
        fields.push(() => {
          select2.value = this.#value[key];
        });
        field.append(text2, select2);
        root.append(field);
      }
      root.append(status);
      const view = { refresh: () => fields.forEach((refresh) => refresh()) };
      this.#views.add(view);
      return { element: root, destroy: () => this.#views.delete(view) };
    }
    stop() {
      this.#document.defaultView?.removeEventListener("storage", this.#storageListener);
      this.#views.clear();
      this.#document.documentElement.classList.remove("flt-reduce-motion");
    }
  };

  // ../fl-tools-core/src/ui/announcer.js
  var AccessibleAnnouncer = class {
    #clock;
    #document;
    #last = /* @__PURE__ */ new Map();
    #regions = /* @__PURE__ */ new Map();
    constructor({ document, clock = Date.now }) {
      if (!document?.createElement) throw new ContractError("Announcer requires a document");
      this.#document = document;
      this.#clock = clock;
    }
    mount() {
      if (this.#regions.size > 0) {
        for (const region of this.#regions.values()) {
          if (!region.isConnected && this.#document.body) this.#document.body.append(region);
        }
        return;
      }
      for (const priority of ["polite", "assertive"]) {
        const region = this.#document.createElement("div");
        region.className = "flt-root flt-live-region";
        region.dataset.fltLive = priority;
        region.setAttribute("aria-live", priority);
        region.setAttribute("aria-atomic", "true");
        this.#document.body.append(region);
        this.#regions.set(priority, region);
      }
    }
    announce(message, { priority = "polite", dedupeMs = 1500 } = {}) {
      if (typeof message !== "string" || message.trim().length === 0 || !this.#regions.has(priority)) {
        throw new ContractError("Announcement requires mounted region, text, and valid priority");
      }
      const text2 = message.trim();
      const now = this.#clock();
      if (now - (this.#last.get(`${priority}:${text2}`) ?? -Infinity) < dedupeMs) return false;
      this.#last.set(`${priority}:${text2}`, now);
      const region = this.#regions.get(priority);
      region.textContent = "";
      region.textContent = text2;
      return true;
    }
    destroy() {
      for (const region of this.#regions.values()) region.remove();
      this.#regions.clear();
      this.#last.clear();
    }
  };

  // ../fl-tools-core/src/ui/controls.js
  function appendText(document, element, text2) {
    element.textContent = String(text2);
    return element;
  }
  var ControlFactory = class {
    #document;
    #idFactory;
    constructor({ document, idFactory = () => crypto.randomUUID() }) {
      if (!document?.createElement || typeof idFactory !== "function") {
        throw new ContractError("Control factory requires a document and id factory");
      }
      this.#document = document;
      this.#idFactory = idFactory;
    }
    button({
      label,
      description = CONTROL_HELP[label],
      onClick,
      variant = "default",
      disabled = false,
      type = "button"
    }) {
      if (!label) throw new ContractError("Button label is required");
      const button = appendText(this.#document, this.#document.createElement("button"), label);
      button.className = "flt-button";
      button.type = type;
      button.disabled = Boolean(disabled);
      button.dataset.fltVariant = variant;
      attachHelp(button, description);
      if (onClick) button.addEventListener("click", onClick);
      return button;
    }
    toggle({
      label,
      description = CONTROL_HELP[label] ?? "",
      checked = false,
      disabled = false,
      onChange
    }) {
      if (!label) throw new ContractError("Toggle label is required");
      const row = this.#document.createElement("div");
      row.className = "flt-toggle-row";
      const text2 = appendText(this.#document, this.#document.createElement("span"), label);
      const labelId = `flt-label-${this.#idFactory()}`;
      text2.className = "flt-label";
      text2.id = labelId;
      if (description) {
        text2.classList.add("flt-has-tooltip");
        text2.dataset.fltTip = String(description);
        text2.setAttribute("aria-description", String(description));
        text2.tabIndex = 0;
      }
      const control = this.#document.createElement("button");
      control.className = "flt-toggle";
      control.type = "button";
      control.setAttribute("role", "switch");
      control.setAttribute("aria-labelledby", labelId);
      control.setAttribute("aria-checked", String(Boolean(checked)));
      control.disabled = Boolean(disabled);
      attachHelp(control, description);
      const indicator = this.#document.createElement("span");
      indicator.className = "flt-toggle-indicator";
      indicator.setAttribute("aria-hidden", "true");
      control.append(indicator);
      const setChecked = (next, { notify = false } = {}) => {
        const value = Boolean(next);
        control.setAttribute("aria-checked", String(value));
        if (notify) onChange?.(value);
        return value;
      };
      control.addEventListener("click", () => {
        if (!control.disabled)
          setChecked(control.getAttribute("aria-checked") !== "true", { notify: true });
      });
      row.append(text2, control);
      return Object.freeze({
        element: row,
        get checked() {
          return control.getAttribute("aria-checked") === "true";
        },
        setChecked,
        switch: control
      });
    }
    textField({
      label,
      description = CONTROL_HELP[label],
      value = "",
      placeholder = "",
      type = "text",
      onInput
    }) {
      if (!label || !["text", "search", "number", "url"].includes(type)) {
        throw new ContractError("Text field requires a label and supported type");
      }
      const field = this.#document.createElement("label");
      field.className = "flt-field";
      const text2 = appendText(this.#document, this.#document.createElement("span"), label);
      text2.className = "flt-label";
      const input = this.#document.createElement("input");
      input.className = "flt-input";
      input.type = type;
      input.value = String(value);
      input.placeholder = String(placeholder);
      attachHelp(input, description);
      attachHelp(text2, description);
      if (onInput) input.addEventListener("input", () => onInput(input.value));
      field.append(text2, input);
      return Object.freeze({ element: field, input });
    }
    search(options) {
      return this.textField({ ...options, type: "search" });
    }
    themeSwatches({ label, description = CONTROL_HELP[label] ?? "", options = [], value, onChange }) {
      if (!label || !Array.isArray(options) || options.length === 0) {
        throw new ContractError("Theme swatches require a label and options");
      }
      const field = this.#document.createElement("div");
      field.className = "flt-field flt-theme-field";
      const text2 = appendText(this.#document, this.#document.createElement("span"), label);
      text2.className = "flt-label";
      const group = this.#document.createElement("div");
      group.className = "flt-theme-swatches";
      group.setAttribute("role", "radiogroup");
      group.setAttribute("aria-label", label);
      attachHelp(text2, description);
      attachHelp(group, description);
      const buttons = [];
      const paint = (next) => {
        for (const button of buttons) {
          const on = button.dataset.fltTheme === next;
          button.classList.toggle("is-on", on);
          button.setAttribute("aria-checked", String(on));
        }
      };
      for (const option of options) {
        if (!option?.value || !option?.label || typeof option.swatch !== "string") {
          throw new ContractError("Theme swatch options require value, label, and swatch");
        }
        const button = this.#document.createElement("button");
        button.type = "button";
        button.className = "flt-theme-swatch";
        button.dataset.fltTheme = option.value;
        button.setAttribute("role", "radio");
        button.setAttribute("aria-label", option.label);
        button.title = option.label;
        button.setAttribute("style", `background:${option.swatch}`);
        button.addEventListener("click", () => {
          paint(option.value);
          onChange?.(option.value);
        });
        buttons.push(button);
        group.append(button);
      }
      paint(value);
      field.append(text2, group);
      return Object.freeze({
        element: field,
        get value() {
          return buttons.find((button) => button.classList.contains("is-on"))?.dataset.fltTheme;
        }
      });
    }
    chipField({
      label,
      description = CONTROL_HELP[label] ?? "Add a value with Enter or comma. Remove active chips with \xD7; select a saved chip to reuse it.",
      values: values2 = [],
      savedValues = [],
      placeholder = "Add a value",
      onChange,
      onForget
    }) {
      if (!label || !Array.isArray(values2) || !Array.isArray(savedValues)) {
        throw new ContractError("Chip field requires a label and value arrays");
      }
      const normalize2 = (items) => [
        ...new Set(items.map((item) => String(item).trim()).filter(Boolean))
      ];
      const active = normalize2(values2);
      const saved = normalize2(savedValues).filter(
        (item) => !active.some((value) => value.toLocaleLowerCase() === item.toLocaleLowerCase())
      );
      const field = this.#document.createElement("div");
      field.className = "flt-chip-field";
      const text2 = appendText(this.#document, this.#document.createElement("span"), label);
      text2.className = "flt-label";
      const input = this.#document.createElement("input");
      input.className = "flt-input flt-chip-input";
      input.type = "text";
      input.placeholder = placeholder;
      input.autocomplete = "off";
      input.setAttribute("aria-label", label);
      attachHelp(input, description);
      attachHelp(text2, description);
      const add = () => {
        const additions = input.value.split(",").map((item) => item.trim()).filter(Boolean);
        if (!additions.length) return;
        input.value = "";
        onChange?.(normalize2([...active, ...additions]));
      };
      input.addEventListener("keydown", (event) => {
        if (!["Enter", ","].includes(event.key)) return;
        event.preventDefault();
        add();
      });
      input.addEventListener("blur", add);
      const list = this.#document.createElement("div");
      list.className = "flt-chip-row";
      const chipValues = [...active, ...saved];
      const renderChip = (value, { inactive = false } = {}) => {
        const chip = this.#document.createElement("span");
        chip.className = `flt-chip${inactive ? " flt-chip-saved" : ""}`;
        const chipText = appendText(this.#document, this.#document.createElement("span"), value);
        chip.append(chipText);
        if (inactive) {
          chip.tabIndex = 0;
          chip.title = `Reuse ${value}`;
          const reuse = () => onChange?.(normalize2([...active, value]));
          chip.addEventListener("click", reuse);
          chip.addEventListener("keydown", (event) => {
            if (!["Enter", " "].includes(event.key)) return;
            event.preventDefault();
            reuse();
          });
        }
        const remove = this.#document.createElement("button");
        remove.type = "button";
        remove.textContent = "\xD7";
        remove.setAttribute("aria-label", `${inactive ? "Forget" : "Remove"} ${value}`);
        remove.addEventListener("click", (event) => {
          event.stopPropagation();
          if (inactive) onForget?.(value);
          else onChange?.(active.filter((item) => item !== value));
        });
        chip.append(remove);
        return chip;
      };
      for (const value of active) list.append(renderChip(value));
      for (const value of saved) list.append(renderChip(value, { inactive: true }));
      if (chipValues.length > 6) {
        const search = this.#document.createElement("input");
        search.className = "flt-input flt-chip-search";
        search.type = "search";
        search.placeholder = `Search ${label.toLocaleLowerCase()}`;
        search.setAttribute("aria-label", `Search ${label}`);
        search.addEventListener("input", () => {
          const query = search.value.trim().toLocaleLowerCase();
          for (const chip of list.querySelectorAll(".flt-chip")) {
            chip.hidden = Boolean(query) && !chip.textContent.toLocaleLowerCase().includes(query);
          }
        });
        field.append(text2, input, search, list);
      } else field.append(text2, input, list);
      return Object.freeze({ element: field, input });
    }
    list({ items, emptyMessage, renderItem }) {
      if (!Array.isArray(items) || typeof renderItem !== "function" || !emptyMessage) {
        throw new ContractError("List requires items, renderer, and empty message");
      }
      if (items.length === 0) {
        const empty = appendText(this.#document, this.#document.createElement("div"), emptyMessage);
        empty.className = "flt-empty";
        empty.setAttribute("role", "status");
        return empty;
      }
      const list = this.#document.createElement("ul");
      list.className = "flt-list";
      for (const item of items) {
        const row = this.#document.createElement("li");
        row.className = "flt-list-item";
        const content = renderItem(item);
        if (content instanceof this.#document.defaultView.Node) row.append(content);
        else row.textContent = String(content ?? "");
        list.append(row);
      }
      return list;
    }
  };

  // ../fl-tools-core/src/ui/dialog.js
  var FOCUSABLE = [
    "button:not([disabled])",
    "[href]",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    '[tabindex]:not([tabindex="-1"])'
  ].join(",");
  var DialogManager = class {
    #active;
    #controls;
    #document;
    #idFactory;
    constructor({ document, controls, idFactory = () => crypto.randomUUID() }) {
      if (!document?.createElement || !controls)
        throw new ContractError("Dialog dependencies are required");
      this.#document = document;
      this.#controls = controls;
      this.#idFactory = idFactory;
    }
    open({ title, description = "", content, actions = [], dismissible = true }) {
      if (!title || !Array.isArray(actions) || actions.length === 0) {
        throw new ContractError("Dialog requires a title and actions");
      }
      if (this.#active) throw new ContractError("Only one Core dialog may be open at a time");
      const returnFocus = this.#document.activeElement;
      const backdrop = this.#document.createElement("div");
      backdrop.className = "flt-root flt-dialog-backdrop";
      const dialog = this.#document.createElement("section");
      dialog.className = "flt-dialog";
      dialog.setAttribute("role", "dialog");
      dialog.setAttribute("aria-modal", "true");
      const titleId = `flt-dialog-title-${this.#idFactory()}`;
      const titleNode = this.#document.createElement("h2");
      titleNode.className = "flt-dialog-title";
      titleNode.id = titleId;
      titleNode.textContent = title;
      dialog.setAttribute("aria-labelledby", titleId);
      dialog.append(titleNode);
      if (description) {
        const descriptionId = `flt-dialog-description-${this.#idFactory()}`;
        const descriptionNode = this.#document.createElement("p");
        descriptionNode.className = "flt-dialog-description";
        descriptionNode.id = descriptionId;
        descriptionNode.textContent = description;
        dialog.setAttribute("aria-describedby", descriptionId);
        dialog.append(descriptionNode);
      }
      if (content) dialog.append(content);
      const actionRow = this.#document.createElement("div");
      actionRow.className = "flt-dialog-actions";
      let settle;
      const result3 = new Promise((resolve2) => {
        settle = resolve2;
      });
      const inerted = [...this.#document.body.children].map((node) => ({ inert: node.inert, node }));
      const close = (value) => {
        if (this.#active?.backdrop !== backdrop) return;
        backdrop.remove();
        for (const entry of inerted) entry.node.inert = entry.inert;
        this.#active = void 0;
        if (returnFocus?.isConnected && typeof returnFocus.focus === "function") returnFocus.focus();
        settle(value);
      };
      for (const action of actions) {
        const button = this.#controls.button({
          label: action.label,
          onClick: () => close(action.value),
          variant: action.variant
        });
        if (action.autofocus) button.dataset.fltAutofocus = "true";
        actionRow.append(button);
      }
      dialog.append(actionRow);
      backdrop.append(dialog);
      for (const entry of inerted) entry.node.inert = true;
      this.#document.body.append(backdrop);
      const onKeyDown = (event) => {
        if (event.key === "Escape" && dismissible) {
          event.preventDefault();
          close(null);
          return;
        }
        if (event.key !== "Tab") return;
        const focusable = [...dialog.querySelectorAll(FOCUSABLE)];
        if (focusable.length === 0) {
          event.preventDefault();
          dialog.focus();
          return;
        }
        const first = focusable[0];
        const last = focusable.at(-1);
        if (event.shiftKey && this.#document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && this.#document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      };
      backdrop.addEventListener("keydown", onKeyDown);
      this.#active = { backdrop, close };
      (dialog.querySelector('[data-flt-autofocus="true"]') ?? dialog.querySelector(FOCUSABLE) ?? dialog).focus();
      return Object.freeze({ close, element: backdrop, result: result3 });
    }
    confirm({
      title,
      description,
      confirmLabel = "Confirm",
      cancelLabel = "Cancel",
      destructive = false
    }) {
      return this.open({
        actions: [
          { label: cancelLabel, value: false },
          {
            autofocus: !destructive,
            label: confirmLabel,
            value: true,
            variant: destructive ? "danger" : "primary"
          }
        ],
        description,
        dismissible: true,
        title
      }).result.then(Boolean);
    }
    destroy() {
      this.#active?.close(null);
    }
  };

  // ../fl-tools-core/src/ui/chrome-contract.js
  var CHROME_CONTRACT_VERSION = 1;
  var CHROME_CONTRACT = Object.freeze({
    baseline: "compact-product-shell",
    artwork: Object.freeze({
      launcherChromeOwner: "core",
      launcherSize: 48,
      menuBadgeContainer: "borderless",
      menuBadgeSize: 38
    }),
    header: Object.freeze({
      divider: "soft-edge-fade",
      prideDivider: "full-gradient",
      versionAction: "changelog"
    }),
    menu: Object.freeze({
      layout: "content-driven",
      navigation: "single-open-accordion",
      widths: Object.freeze({ compact: 260, full: 312, narrow: 220 })
    }),
    notices: Object.freeze({
      actions: Object.freeze(["release", "install"]),
      durationMs: 3e4,
      gapPx: 8,
      insideMenu: false,
      placement: "floating"
    }),
    toggles: Object.freeze({
      height: 20,
      knobSize: 14,
      style: "matte",
      width: 34
    }),
    updates: Object.freeze({
      intervalMs: 15 * 60 * 1e3,
      source: "userscript-metadata"
    })
  });
  function applyChromeContract(element) {
    if (!element?.dataset) return element;
    element.dataset.fltChromeContract = String(CHROME_CONTRACT_VERSION);
    return element;
  }

  // ../fl-tools-core/src/ui/launcher.js
  var RESERVED = /* @__PURE__ */ new Set(["core", "devkit"]);
  var ICON_PROTOCOLS = /* @__PURE__ */ new Set(["blob:", "chrome-extension:", "data:", "https:", "moz-extension:"]);
  var VIEWPORT_EDGE = 8;
  function launcherSize(handle) {
    const rect = handle?.getBoundingClientRect?.() ?? { width: 0, height: 0 };
    return {
      width: Math.max(
        rect.width || 0,
        handle?.offsetWidth || 0,
        CHROME_CONTRACT.artwork.launcherSize
      ),
      height: Math.max(
        rect.height || 0,
        handle?.offsetHeight || 0,
        CHROME_CONTRACT.artwork.launcherSize
      )
    };
  }
  function clampLauncherOrigin(view, origin, size) {
    const width = Math.max(1, size?.width || 0);
    const height = Math.max(1, size?.height || 0);
    const viewWidth = view?.innerWidth || 0;
    const viewHeight = view?.innerHeight || 0;
    return {
      x: Math.max(VIEWPORT_EDGE, viewWidth - width - VIEWPORT_EDGE),
      y: Math.max(
        VIEWPORT_EDGE,
        Math.min(origin.y, Math.max(VIEWPORT_EDGE, viewHeight - height - VIEWPORT_EDGE))
      )
    };
  }
  function dockIsLeft(_document) {
    return false;
  }
  function isSafeIconUrl(value, baseUrl) {
    try {
      return ICON_PROTOCOLS.has(new URL(value, baseUrl).protocol);
    } catch {
      return false;
    }
  }
  function ensureUpdateCluster(document) {
    let cluster = document.querySelector(".flt-cluster");
    if (!cluster) {
      cluster = document.createElement("div");
      cluster.className = "flt-root flt-cluster";
      document.body?.append(cluster);
    }
    let progressStack = cluster.querySelector(".flt-progress-stack");
    if (!progressStack) {
      progressStack = document.createElement("div");
      progressStack.className = "flt-progress-stack";
      cluster.append(progressStack);
    }
    return { cluster, progressStack };
  }
  var LauncherManager = class {
    #cluster;
    #document;
    #entries = /* @__PURE__ */ new Map();
    #observer;
    #root;
    #position;
    #cleanup;
    #suppressClick = false;
    #reposition;
    #updateAvailable = /* @__PURE__ */ new Map();
    constructor({ document }) {
      if (!document?.createElement) throw new ContractError("Launcher manager requires a document");
      this.#document = document;
    }
    register({ productId: productId2, name, iconUrl, onActivate }) {
      if (!/^[a-z][a-z0-9-]*$/.test(productId2 ?? "") || RESERVED.has(productId2) || typeof name !== "string" || name.length === 0 || typeof iconUrl !== "string" || !isSafeIconUrl(iconUrl, this.#document.baseURI) || typeof onActivate !== "function") {
        throw new ContractError("Launcher requires a user-facing product and approved icon asset");
      }
      if (this.#entries.has(productId2))
        throw new ContractError("Launcher product is already registered");
      const root = this.#mount();
      const button = this.#document.createElement("button");
      button.className = "flt-launcher-button";
      button.type = "button";
      button.dataset.fltProduct = productId2;
      button.dataset.fltLauncherSlot = String(this.#entries.size);
      button.dataset.userscriptLauncher = "userscript-launcher-v1";
      applyChromeContract(button);
      button.setAttribute("aria-label", name);
      button.setAttribute("aria-expanded", "false");
      const icon = this.#document.createElement("img");
      icon.className = "flt-launcher-icon";
      icon.alt = "";
      icon.src = iconUrl;
      button.append(icon);
      icon.draggable = false;
      button.addEventListener("click", (event) => {
        if (this.#suppressClick && event.detail !== 0) {
          event.preventDefault();
          return;
        }
        onActivate({ productId: productId2 });
      });
      root.append(button);
      this.#entries.set(productId2, { button, name });
      this.#applyUpdateAvailable(productId2);
      this.#reposition?.();
      return Object.freeze({ button, unregister: () => this.unregister(productId2) });
    }
    setActive(productId2) {
      if (productId2 !== null && !this.#entries.has(productId2)) {
        throw new ContractError("Unknown launcher product", { productId: productId2 });
      }
      for (const [id, entry] of this.#entries) {
        entry.button.setAttribute("aria-expanded", String(id === productId2));
      }
    }
    has(productId2) {
      return this.#entries.has(productId2);
    }
    setUpdateAvailable(productId2, version) {
      if (version) this.#updateAvailable.set(productId2, version);
      else this.#updateAvailable.delete(productId2);
      this.#applyUpdateAvailable(productId2);
    }
    resetPosition() {
      this.#position = void 0;
      for (const property of ["left", "right", "top", "bottom"])
        this.#cluster?.style.removeProperty(property);
      const view = this.#document.defaultView;
      try {
        view.localStorage.removeItem("flt-launcher-position");
      } catch {
      }
      view.dispatchEvent(new view.Event("flt:launcher-moved"));
    }
    unregister(productId2) {
      const entry = this.#entries.get(productId2);
      if (!entry) return false;
      entry.button.remove();
      this.#entries.delete(productId2);
      this.#updateAvailable.delete(productId2);
      if (this.#entries.size === 0) this.#teardownHost();
      return true;
    }
    destroy() {
      this.#cleanup?.();
      this.#entries.clear();
      this.#updateAvailable.clear();
      this.#observer?.disconnect();
      this.#observer = void 0;
      this.#teardownHost();
    }
    #teardownHost() {
      this.#cleanup?.();
      this.#cleanup = void 0;
      this.#root?.remove();
      this.#root = void 0;
      if (this.#cluster && !this.#cluster.querySelector(".flt-panel")) this.#cluster.remove();
      this.#cluster = void 0;
    }
    #mount() {
      if (this.#root?.isConnected) return this.#root;
      const { cluster, progressStack } = ensureUpdateCluster(this.#document);
      cluster.dataset.fltOwner = "core";
      const root = this.#root ?? this.#document.createElement("nav");
      root.className = "flt-root flt-launcher";
      root.dataset.fltOwner = "core";
      root.setAttribute("aria-label", "FL Tools products");
      if (root.parentElement !== progressStack) progressStack.append(root);
      if (!cluster.isConnected) this.#document.body.append(cluster);
      this.#cluster = cluster;
      this.#root = root;
      this.#cleanup?.();
      this.#enableDrag(root, cluster);
      const Observer = this.#document.defaultView?.MutationObserver;
      if (Observer && !this.#observer) {
        this.#observer = new Observer(() => {
          if (this.#entries.size === 0 || !this.#document.body) return;
          if (this.#cluster?.isConnected && this.#root?.isConnected) return;
          const mounted = ensureUpdateCluster(this.#document);
          this.#cluster = mounted.cluster;
          this.#cluster.dataset.fltOwner = "core";
          if (!this.#cluster.isConnected) this.#document.body.append(this.#cluster);
          if (this.#root && this.#root.parentElement !== mounted.progressStack) {
            mounted.progressStack.append(this.#root);
          }
        });
        this.#observer.observe(this.#document, { childList: true, subtree: true });
      }
      return root;
    }
    #enableDrag(handle, cluster) {
      const view = this.#document.defaultView;
      const abort = new view.AbortController();
      const options = { signal: abort.signal };
      this.#cleanup = () => abort.abort();
      let drag;
      const persist = () => {
        try {
          view.localStorage.setItem("flt-launcher-position", JSON.stringify(this.#position));
        } catch {
        }
      };
      const place = (_x, y) => {
        const size = launcherSize(handle);
        this.#position = clampLauncherOrigin(view, { x: _x, y }, size);
        Object.assign(cluster.style, {
          left: "auto",
          top: `${this.#position.y}px`,
          right: `${VIEWPORT_EDGE}px`,
          bottom: "auto"
        });
        persist();
        view.dispatchEvent(new view.Event("flt:launcher-moved"));
      };
      this.#reposition = () => {
        if (this.#position) place(this.#position.x, this.#position.y);
      };
      try {
        const saved = JSON.parse(view.localStorage.getItem("flt-launcher-position"));
        if (Number.isFinite(saved?.x) && Number.isFinite(saved?.y)) place(saved.x, saved.y);
      } catch {
      }
      handle.addEventListener(
        "pointerdown",
        (event) => {
          if (event.button !== 0) return;
          this.#suppressClick = false;
          const rect = handle.getBoundingClientRect();
          drag = {
            id: event.pointerId,
            x: event.clientX,
            y: event.clientY,
            left: rect.left,
            top: rect.top,
            moved: false
          };
        },
        options
      );
      view.addEventListener(
        "pointermove",
        (event) => {
          if (!drag || event.pointerId !== drag.id) return;
          const dy = event.clientY - drag.y;
          if (!drag.moved && Math.abs(dy) < 5) return;
          drag.moved = true;
          this.#suppressClick = true;
          handle.dataset.dragging = "true";
          handle.setPointerCapture?.(event.pointerId);
          event.preventDefault();
          place(drag.left, drag.top + dy);
        },
        options
      );
      const end = (event) => {
        if (!drag || event.pointerId !== drag.id) return;
        if (drag.moved) persist();
        if (handle.hasPointerCapture?.(event.pointerId))
          handle.releasePointerCapture(event.pointerId);
        delete handle.dataset.dragging;
        drag = void 0;
      };
      view.addEventListener("pointerup", end, options);
      view.addEventListener("pointercancel", end, options);
      view.addEventListener(
        "resize",
        () => {
          if (this.#position) place(this.#position.x, this.#position.y);
        },
        options
      );
      handle.addEventListener(
        "keydown",
        (event) => {
          if (!event.altKey || !["ArrowUp", "ArrowDown"].includes(event.key)) return;
          event.preventDefault();
          const rect = handle.getBoundingClientRect();
          place(
            rect.left,
            rect.top + (event.key === "ArrowDown" ? 16 : event.key === "ArrowUp" ? -16 : 0)
          );
        },
        options
      );
    }
    #applyUpdateAvailable(productId2) {
      const entry = this.#entries.get(productId2);
      if (!entry) return;
      const version = this.#updateAvailable.get(productId2);
      entry.button.classList.toggle("update-available", Boolean(version));
      entry.button.setAttribute(
        "aria-label",
        version ? `${entry.name} \xB7 Update v${version} Available` : entry.name
      );
    }
  };

  // ../fl-tools-core/src/ui/notification-surface.js
  var NotificationSurface = class {
    #announcer;
    #controls;
    #document;
    #enabled = true;
    #notifications;
    #root;
    #unsubscribe;
    constructor({ announcer, controls, document, notifications }) {
      if (!document?.createElement || !controls || !announcer || !notifications?.subscribe) {
        throw new ContractError("Notification surface dependencies are required");
      }
      this.#announcer = announcer;
      this.#controls = controls;
      this.#document = document;
      this.#notifications = notifications;
    }
    mount() {
      if (this.#unsubscribe) return;
      this.#unsubscribe = this.#notifications.subscribe((item) => this.#render(item));
    }
    destroy() {
      this.#unsubscribe?.();
      this.#unsubscribe = void 0;
      this.#root?.remove();
      this.#root = void 0;
    }
    setEnabled(enabled) {
      this.#enabled = enabled === true;
      if (!this.#enabled) {
        this.#root?.remove();
        this.#root = void 0;
        return;
      }
      this.#render(this.#notifications.active());
    }
    #render(item) {
      if (!this.#enabled) return;
      if (!item) {
        this.#root?.remove();
        this.#root = void 0;
        return;
      }
      const root = this.#root ?? this.#document.createElement("aside");
      root.className = "flt-root flt-notice";
      root.dataset.fltOwner = "core";
      root.dataset.fltPriority = item.priority.toLowerCase();
      root.setAttribute("role", ["CRITICAL", "HIGH"].includes(item.priority) ? "alert" : "status");
      root.replaceChildren();
      const heading2 = this.#document.createElement("h2");
      heading2.className = "flt-notice-title";
      heading2.textContent = item.title;
      const message = this.#document.createElement("p");
      message.className = "flt-notice-message";
      message.textContent = item.message;
      root.append(heading2, message);
      if (item.bullets.length) {
        const list = this.#document.createElement("ul");
        list.className = "flt-notice-list";
        for (const bullet of item.bullets) {
          const row = this.#document.createElement("li");
          row.textContent = bullet;
          list.append(row);
        }
        root.append(list);
      }
      const actions = this.#document.createElement("div");
      actions.className = "flt-notice-actions";
      for (const action of item.actions) {
        actions.append(
          this.#controls.button({
            label: action.label,
            onClick: () => Promise.resolve(action.handler()).catch(() => void 0),
            variant: action.label === "Update" ? "primary" : "default"
          })
        );
      }
      const dismiss = this.#controls.button({
        label: "Dismiss",
        onClick: () => this.#notifications.dismiss(item.id)
      });
      actions.append(dismiss);
      root.append(actions);
      if (!root.isConnected) this.#document.body.append(root);
      this.#root = root;
      this.#announcer.announce(`${item.title}. ${item.message}`, {
        priority: ["CRITICAL", "HIGH"].includes(item.priority) ? "assertive" : "polite"
      });
    }
  };

  // ../fl-tools-core/src/ui/presentation.js
  var CARD_STATES = Object.freeze({
    DIMMED: "DIMMED",
    HIDDEN: "HIDDEN",
    HIGHLIGHTED: "HIGHLIGHTED",
    NORMAL: "NORMAL"
  });
  var MEDIA_STATES = Object.freeze({
    BLURRED: "BLURRED",
    HIDDEN: "HIDDEN",
    VISIBLE: "VISIBLE"
  });
  var PRESENTATION_PRIORITIES = Object.freeze({
    quiet: 1,
    softBlock: 2,
    filter: 3,
    seen: 4,
    favorite: 5,
    highlighter: 6,
    normal: 7
  });
  var CARD_SEVERITY = Object.freeze({ HIDDEN: 4, DIMMED: 3, HIGHLIGHTED: 2, NORMAL: 1 });
  var REASON_COPY = Object.freeze({
    favorite: "Highlighted because this person is a Favorite.",
    filter: "Changed because this card does not match the current Browse filters.",
    highlighter: "Highlighted because a Highlighter rule matched.",
    quiet: "Changed because this person is Quieted.",
    seen: "Changed because this item was already opened.",
    softBlock: "Changed because of a local Soft Block. FetLife itself is not blocked."
  });
  function chipExplanation(decision) {
    if (typeof decision.detail === "string" && decision.detail.trim()) return decision.detail.trim();
    const reason = REASON_COPY[decision.reason];
    const state = decision.state === CARD_STATES.HIGHLIGHTED ? "Highlighted" : "Dimmed";
    return reason ? `${state}: ${reason}` : `${state} by ${decision.reason}.`;
  }
  var MEDIA_SEVERITY = Object.freeze({ HIDDEN: 3, BLURRED: 2, VISIBLE: 1 });
  function resolve(requests, priorities, severity, validStates) {
    if (!Array.isArray(requests)) throw new ContractError("Presentation requests must be an array");
    const valid3 = requests.filter((request) => {
      if (typeof request?.reason !== "string" || request.reason.length === 0 || !priorities[request.reason] || !validStates.includes(request.state)) {
        throw new ContractError("Presentation request is invalid", { request });
      }
      if (request.treatment !== void 0 && (typeof request.treatment !== "string" || !/^[a-z0-9-]{1,40}$/.test(request.treatment))) {
        throw new ContractError("Presentation treatment is invalid", { request });
      }
      return true;
    });
    valid3.sort(
      (left, right) => priorities[left.reason] - priorities[right.reason] || severity[right.state] - severity[left.state]
    );
    return valid3[0] ?? null;
  }
  var PresentationPolicy = class {
    #cards = /* @__PURE__ */ new Map();
    #document;
    #media = /* @__PURE__ */ new Map();
    constructor({ document }) {
      if (!document?.createElement)
        throw new ContractError("Presentation policy requires a document");
      this.#document = document;
    }
    resolveCard(requests) {
      return resolve(requests, PRESENTATION_PRIORITIES, CARD_SEVERITY, Object.values(CARD_STATES)) ?? {
        reason: "normal",
        state: CARD_STATES.NORMAL
      };
    }
    resolveMedia(requests) {
      if (!Array.isArray(requests)) throw new ContractError("Presentation requests must be an array");
      const priorities = Object.fromEntries(
        requests.map((request) => {
          if (typeof request?.reason !== "string" || request.reason.length === 0) {
            throw new ContractError("Presentation request is invalid", { request });
          }
          return [request.reason, 1];
        })
      );
      return resolve(requests, priorities, MEDIA_SEVERITY, Object.values(MEDIA_STATES)) ?? {
        reason: "normal",
        state: MEDIA_STATES.VISIBLE
      };
    }
    applyCard(element, requests) {
      if (!element?.classList) throw new ContractError("Card presentation requires an element");
      if (!this.#cards.has(element)) {
        this.#cards.set(element, {
          ariaHidden: element.getAttribute("aria-hidden"),
          hidden: element.hidden
        });
      }
      const decision = this.resolveCard(requests);
      this.#clearCardClasses(element);
      element.dataset.fltPresentation = decision.state.toLowerCase();
      element.dataset.fltPresentationReason = decision.reason;
      if (decision.treatment) element.dataset.fltPresentationTreatment = decision.treatment;
      else delete element.dataset.fltPresentationTreatment;
      if (decision.state === CARD_STATES.HIDDEN) {
        element.classList.add("flt-state-hidden");
        element.hidden = true;
        element.setAttribute("aria-hidden", "true");
      } else {
        const original = this.#cards.get(element);
        element.hidden = original.hidden;
        if (original.ariaHidden === null) element.removeAttribute("aria-hidden");
        else element.setAttribute("aria-hidden", original.ariaHidden);
        if (decision.state === CARD_STATES.DIMMED) element.classList.add("flt-state-dimmed");
        if (decision.state === CARD_STATES.HIGHLIGHTED)
          element.classList.add("flt-state-highlighted");
        if ([CARD_STATES.DIMMED, CARD_STATES.HIGHLIGHTED].includes(decision.state)) {
          const indicator = this.#document.createElement("button");
          indicator.type = "button";
          indicator.className = "flt-root flt-presentation-indicator flt-card-chip";
          indicator.dataset.fltPresentationIndicator = "true";
          indicator.dataset.fltTip = chipExplanation(decision);
          indicator.setAttribute("aria-expanded", "false");
          indicator.setAttribute("aria-label", indicator.dataset.fltTip);
          indicator.textContent = decision.state === CARD_STATES.DIMMED ? "Dimmed" : "Highlighted";
          indicator.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            indicator.setAttribute(
              "aria-expanded",
              indicator.getAttribute("aria-expanded") === "true" ? "false" : "true"
            );
          });
          element.prepend(indicator);
        }
      }
      return Object.freeze({ ...decision });
    }
    clearCard(element) {
      const original = this.#cards.get(element);
      if (!original) return false;
      this.#clearCardClasses(element);
      element.hidden = original.hidden;
      if (original.ariaHidden === null) element.removeAttribute("aria-hidden");
      else element.setAttribute("aria-hidden", original.ariaHidden);
      delete element.dataset.fltPresentation;
      delete element.dataset.fltPresentationReason;
      delete element.dataset.fltPresentationTreatment;
      this.#cards.delete(element);
      return true;
    }
    applyMedia(element, requests, { blurPixels = 4 } = {}) {
      if (!element?.classList || !Number.isFinite(blurPixels) || blurPixels < 1 || blurPixels > 10) {
        throw new ContractError("Media presentation requires an element and blur from 1 to 10");
      }
      if (!this.#media.has(element)) this.#media.set(element, true);
      const decision = this.resolveMedia(requests);
      element.classList.remove("flt-media-blurred", "flt-media-hidden");
      element.style.removeProperty("--flt-media-blur");
      if (decision.state === MEDIA_STATES.BLURRED) {
        element.classList.add("flt-media-blurred");
        element.style.setProperty("--flt-media-blur", `${blurPixels}px`);
      }
      if (decision.state === MEDIA_STATES.HIDDEN) element.classList.add("flt-media-hidden");
      element.dataset.fltMedia = decision.state.toLowerCase();
      return Object.freeze({ ...decision });
    }
    clearMedia(element) {
      if (!this.#media.has(element)) return false;
      element.classList.remove("flt-media-blurred", "flt-media-hidden");
      element.style.removeProperty("--flt-media-blur");
      delete element.dataset.fltMedia;
      this.#media.delete(element);
      return true;
    }
    pruneDisconnected() {
      let cards = 0;
      let media = 0;
      for (const element of [...this.#cards.keys()]) {
        if (!element.isConnected) {
          this.clearCard(element);
          cards += 1;
        }
      }
      for (const element of [...this.#media.keys()]) {
        if (!element.isConnected) {
          this.clearMedia(element);
          media += 1;
        }
      }
      return Object.freeze({ cards, media });
    }
    destroy() {
      for (const element of [...this.#cards.keys()]) this.clearCard(element);
      for (const element of [...this.#media.keys()]) this.clearMedia(element);
    }
    #clearCardClasses(element) {
      element.classList.remove("flt-state-dimmed", "flt-state-hidden", "flt-state-highlighted");
      element.querySelectorAll(':scope > [data-flt-presentation-indicator="true"]').forEach((node) => node.remove());
    }
  };

  // ../fl-tools-core/src/ui/theme.js
  var UI_Z_INDEX = Object.freeze({
    launcher: 2147483200,
    panel: 2147483300,
    notice: 2147483400,
    dialog: 2147483500
  });
  var THEME_TOKENS = Object.freeze([
    "accent",
    "accent-contrast",
    "background",
    "border",
    "danger",
    "focus",
    "muted",
    "shadow",
    "surface",
    "surface-raised",
    "text",
    "warning"
  ]);
  var BASE_CSS = `
html.flt-reduce-motion .flt-root, html.flt-reduce-motion .flt-root * { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
:root {
  --flt-accent: #7f91a8;
  --flt-accent-contrast: #0e1217;
  --flt-background: #111114;
  --flt-border: #34343b;
  --flt-danger: #e27979;
  --flt-focus: #9cc8ff;
  --flt-muted: #adadb8;
  --flt-shadow: 0 18px 50px rgb(0 0 0 / 53%);
  --flt-surface: #18181b;
  --flt-surface-raised: #202026;
  --flt-text: #efeff1;
  --flt-warning: #edc574;
  --flt-radius-small: 7px;
  --flt-radius-medium: 11px;
  --flt-radius-large: 14px;
  --flt-launcher-size: ${CHROME_CONTRACT.artwork.launcherSize}px;
  --flt-menu-badge-size: ${CHROME_CONTRACT.artwork.menuBadgeSize}px;
  --flt-menu-width-compact: ${CHROME_CONTRACT.menu.widths.compact}px;
  --flt-menu-width-full: ${CHROME_CONTRACT.menu.widths.full}px;
  --flt-menu-width-narrow: ${CHROME_CONTRACT.menu.widths.narrow}px;
  --flt-control-height: 30px;
  --flt-toggle-height: ${CHROME_CONTRACT.toggles.height}px;
  --flt-toggle-knob-size: ${CHROME_CONTRACT.toggles.knobSize}px;
  --flt-toggle-width: ${CHROME_CONTRACT.toggles.width}px;
  --flt-z-launcher: ${UI_Z_INDEX.launcher};
  --flt-z-panel: ${UI_Z_INDEX.panel};
  --flt-z-notice: ${UI_Z_INDEX.notice};
  --flt-z-dialog: ${UI_Z_INDEX.dialog};
}
.flt-root, .flt-root * { box-sizing: border-box; }
.flt-launcher { touch-action: pan-x; user-select: none; }
.flt-launcher[data-dragging="true"], .flt-launcher[data-dragging="true"] * { cursor: grabbing; }
.flt-cluster {
  position: fixed;
  right: 12px;
  bottom: 12px;
  z-index: var(--flt-z-panel);
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
  width: max-content;
  max-width: calc(100vw - 24px);
  max-height: calc(100vh - 16px);
  gap: 8px;
}
.flt-cluster.open-up { flex-direction: column; }
.flt-progress-stack {
  width: min(var(--flt-menu-width-full), calc(100vw - 24px));
  max-width: calc(100vw - 24px);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 6px;
  transition: .15s width;
}
.flt-progress-stack > .flt-launcher { align-self: flex-end; }
.flt-root {
  color: var(--flt-text);
  color-scheme: dark;
  font: 14px/1.45 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
.flt-button, .flt-icon-button, .flt-launcher-button {
  appearance: none;
  border: 1px solid var(--flt-border);
  border-radius: var(--flt-radius-small);
  background: var(--flt-surface-raised);
  color: var(--flt-text);
  cursor: pointer;
  font: inherit;
}
.flt-button {
  height: auto; min-height: var(--flt-control-height); padding: 5px 8px; line-height: 1.25;
  white-space: normal; overflow-wrap: anywhere;
}
.flt-button:hover, .flt-icon-button:hover, .flt-launcher-button:hover {
  border-color: var(--flt-accent);
}
.flt-button:focus-visible, .flt-icon-button:focus-visible, .flt-tool-header:focus-visible,
.flt-launcher-button:focus-visible, .flt-input:focus-visible, .flt-toggle:focus-visible,
.flt-theme-swatch:focus-visible {
  outline: 3px solid var(--flt-focus);
  outline-offset: 2px;
}
.flt-button:disabled, .flt-icon-button:disabled,
.flt-launcher-button:disabled, .flt-toggle:disabled { cursor: not-allowed; opacity: .58; }
.flt-button[data-flt-variant="primary"] { background: var(--flt-accent); color: var(--flt-accent-contrast); }
.flt-button[data-flt-variant="danger"] { border-color: var(--flt-danger); color: var(--flt-danger); }
.flt-launcher {
  display: grid;
  grid-template-columns: repeat(2, var(--flt-launcher-size));
  gap: 8px;
  width: max-content;
  max-width: calc(100vw - 24px);
  direction: rtl;
}
.flt-launcher-button {
  position: relative;
  width: var(--flt-launcher-size);
  height: var(--flt-launcher-size);
  padding: 3px;
  border: 1px solid color-mix(in srgb, var(--flt-accent) 30%, transparent);
  border-radius: 10px;
  background: var(--flt-surface);
  box-shadow: 0 6px 22px rgb(0 0 0 / 40%);
  direction: ltr;
  transition: .14s border-color, .14s box-shadow, .14s background, .14s transform;
}
.flt-launcher-button:hover {
  border-color: color-mix(in srgb, var(--flt-accent) 58%, transparent);
  background: color-mix(in srgb, var(--flt-surface) 96%, var(--flt-accent) 4%);
  box-shadow: 0 8px 24px rgb(0 0 0 / 47%);
  transform: scale(1.015);
}
.flt-launcher-button[aria-expanded="true"] {
  border-color: color-mix(in srgb, var(--flt-accent) 72%, transparent);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--flt-accent) 22%, transparent), 0 8px 26px rgb(0 0 0 / 53%);
  transform: scale(1.01);
}
.flt-launcher[data-dragging="true"] .flt-launcher-button { transform: scale(1.03); box-shadow: 0 10px 28px rgb(0 0 0 / 60%); }
.flt-launcher-button.update-available::after {
  content: "\u2191";
  position: absolute;
  top: -4px;
  right: -4px;
  width: 14px;
  height: 14px;
  display: grid;
  place-items: center;
  border: 2px solid var(--flt-surface);
  border-radius: 4px;
  background: #f59e0b;
  color: #111114;
  font-size: 8px;
  font-weight: 950;
  box-shadow: 0 2px 6px rgb(0 0 0 / 47%);
  z-index: 4;
  pointer-events: none;
}
.flt-launcher-icon { width: 40px; height: 40px; border-radius: 9px; display: block; overflow: hidden; direction: ltr; }
.flt-panel {
  position: relative;
  z-index: auto;
  width: min(var(--flt-menu-width-full), calc(100vw - 24px));
  height: max-content;
  min-height: 0;
  max-height: calc(100vh - 24px);
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  overflow: hidden;
  border: 0;
  border-radius: var(--flt-radius-large);
  background: var(--flt-background);
  box-shadow: var(--flt-shadow);
  transition: .15s width, .15s opacity;
}
.flt-update-notice { transition: .15s opacity; }
.flt-panel[hidden] { display: none !important; }
.flt-header { padding: 9px 9px 4px; background: var(--flt-background); }
.flt-menu-head { display: grid; grid-template-columns: minmax(0, 1fr) 30px; align-items: start; gap: 8px; width: 100%; }
.flt-menu-head-with-help { grid-template-columns: minmax(0, 1fr) 30px 30px; gap: 6px; }
.flt-header-brand { display: grid; grid-template-columns: var(--flt-menu-badge-size) minmax(0, 1fr); align-items: center; gap: 8px; min-width: 0; width: 100%; }
.flt-header-icon {
  box-sizing: border-box;
  width: var(--flt-menu-badge-size);
  height: var(--flt-menu-badge-size);
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
  display: block;
  object-fit: contain;
  overflow: hidden;
}
.flt-header-copy { min-width: 0; overflow: hidden; }
.flt-header-brand > .flt-header-copy:first-child { grid-column: 1 / -1; }
.flt-header-title-row { display: flex; align-items: center; gap: 6px; min-width: 0; flex-wrap: wrap; }
.flt-header-title { margin: 0; font-size: 15px; font-weight: 800; line-height: 1.1; }
.flt-header-version { min-height: 18px; padding: 1px 6px; border: 1px solid color-mix(in srgb, var(--flt-accent) 48%, var(--flt-border)); border-radius: 6px; background: color-mix(in srgb, var(--flt-accent) 10%, var(--flt-surface)); color: color-mix(in srgb, var(--flt-accent) 66%, var(--flt-text)); cursor: pointer; font: 800 8px/1 system-ui, sans-serif; white-space: nowrap; }
.flt-header-version:hover, .flt-header-version:focus-visible { border-color: var(--flt-accent); background: color-mix(in srgb, var(--flt-accent) 18%, var(--flt-surface)); color: var(--flt-text); outline: none; }
.flt-header-help, .flt-header-close { width: 30px; height: 30px; min-width: 30px; padding: 0; justify-self: end; border-radius: 8px; background: var(--flt-surface); color: var(--flt-muted); font: 18px/1 Arial, sans-serif; }
.flt-header-help:hover, .flt-header-help[aria-expanded="true"], .flt-header-close:hover { border-color: var(--flt-accent); color: var(--flt-text); background: var(--flt-surface-raised); }
.flt-header-items { min-width: 0; margin-top: 2px; color: var(--flt-muted); font-size: 9px; line-height: 1.2; white-space: normal; overflow-wrap: anywhere; }
.flt-header-item { min-width: 0; white-space: normal; overflow-wrap: anywhere; }
.flt-header-divider { height: 1px; width: 100%; margin: 5px 0; background: linear-gradient(90deg, transparent, var(--flt-accent), var(--flt-accent-secondary, var(--flt-accent)), transparent); opacity: .62; }
.flt-visually-hidden { position: absolute !important; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
.flt-menu-search { display: block; margin-top: 0; }
.flt-panel .flt-menu-search-input { width: 100%; max-width: none; min-height: 28px; padding: 3px 7px; font-size: 11px; }
.flt-panel-body { flex: 0 1 auto; min-height: 0; width: 100%; max-width: none; margin: 0; overflow: auto; padding: 4px 6px; scrollbar-width: thin; scrollbar-color: var(--flt-border) transparent; }
.flt-top-content { flex: none; padding: 0 6px 4px; }
.flt-preset-toolbar { display: flex; align-items: center; flex-wrap: wrap; gap: 5px 7px; padding: 4px 0; border-top: 1px solid var(--flt-border); border-bottom: 1px solid var(--flt-border); }
.flt-preset-toolbar > .flt-label { color: var(--flt-text); font-weight: 750; }
.flt-update-notice {
  position: relative;
  display: block;
  width: 100%;
  max-width: calc(100vw - 24px);
  margin: 0 0 8px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid color-mix(in srgb, var(--flt-accent) 62%, var(--flt-border));
  border-radius: 10px;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--flt-surface) 88%, var(--flt-accent) 12%),
    var(--flt-background) 76%
  );
  color: var(--flt-text);
  box-shadow: 0 10px 28px rgb(0 0 0 / 53%);
  z-index: 12;
}
.flt-progress-stack > .flt-update-notice { width: min(var(--flt-menu-width-full), calc(100vw - 24px)); }
.flt-update-notice[hidden] { display: none; }
.flt-update-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; padding-right: 36px; }
.flt-update-heading { min-width: 0; }
.flt-update-kicker { margin-bottom: 2px; color: var(--flt-accent-secondary, var(--flt-accent)); font-size: 8px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; }
.flt-update-title { color: var(--flt-text); font-size: 12px; font-weight: 850; line-height: 1.25; }
.flt-update-version { flex: none; padding: 2px 6px; border: 1px solid color-mix(in srgb, var(--flt-accent) 62%, var(--flt-border)); border-radius: 6px; background: color-mix(in srgb, var(--flt-surface) 82%, var(--flt-accent) 18%); color: var(--flt-text); font-size: 8px; font-weight: 800; white-space: nowrap; }
.flt-update-text { margin-top: 6px; color: var(--flt-muted); font-size: 9px; line-height: 1.45; white-space: normal; overflow-wrap: anywhere; }
.flt-update-list { margin: 7px 0 0; padding: 0 0 0 15px; max-height: 86px; overflow: auto; color: var(--flt-text); font-size: 9px; line-height: 1.4; scrollbar-width: thin; }
.flt-update-list li::marker { color: var(--flt-accent); }
.flt-update-list li + li { margin-top: 3px; }
.flt-update-actions { display: flex; justify-content: flex-end; gap: 6px; margin-top: 8px; padding-top: 7px; border-top: 1px solid var(--flt-border); }
.flt-update-action, .flt-update-release, .flt-update-dismiss { border: 1px solid var(--flt-border); border-radius: 7px; background: var(--flt-background); color: var(--flt-text); cursor: pointer; }
.flt-update-action, .flt-update-release { min-height: 27px; padding: 0 10px; font-size: 9px; font-weight: 800; }
.flt-update-action { display: inline-flex; align-items: center; justify-content: center; text-decoration: none; border-color: var(--flt-accent); background: color-mix(in srgb, var(--flt-surface) 68%, var(--flt-accent) 32%); }
.flt-update-action[hidden], .flt-update-release[hidden] { display: none; }
.flt-update-release { border-color: color-mix(in srgb, var(--flt-border) 78%, var(--flt-accent) 22%); background: var(--flt-surface); }
.flt-update-dismiss { position: absolute; top: 7px; right: 7px; width: 23px; height: 23px; padding: 0; background: var(--flt-surface); color: var(--flt-muted); font-size: 15px; line-height: 1; }
.flt-update-action:hover, .flt-update-action:focus-visible { border-color: var(--flt-accent); background: color-mix(in srgb, var(--flt-surface) 55%, var(--flt-accent) 45%); color: var(--flt-text); outline: none; }
.flt-update-release:hover, .flt-update-release:focus-visible, .flt-update-dismiss:hover, .flt-update-dismiss:focus-visible { border-color: var(--flt-accent); color: var(--flt-text); outline: none; }
.flt-update-dismiss:hover, .flt-update-dismiss:focus-visible { background: var(--flt-surface-raised); }
.flt-update-release:hover, .flt-update-release:focus-visible { background: color-mix(in srgb, var(--flt-surface) 88%, var(--flt-accent) 12%); }
.flt-update-notice[data-flt-theme-skin="pride"] {
  border: 1px solid transparent;
  background-image: linear-gradient(var(--flt-surface), var(--flt-surface)),
    linear-gradient(90deg, #c97b83, #d29a70, #d0c07d, #70a886, #7091b6, #a27ba9);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}
.flt-update-notice[data-flt-theme-skin="pride"] .flt-update-version,
.flt-update-notice[data-flt-theme-skin="pride"] .flt-update-action {
  border-color: transparent;
  background-image: linear-gradient(var(--flt-surface), var(--flt-surface)),
    linear-gradient(90deg, #c97b83, #d29a70, #d0c07d, #70a886, #7091b6, #a27ba9);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}
.flt-tool-panel { position: relative; margin-top: 5px; border: 1px solid #27272d; background: #19191e; border-radius: 9px; overflow: visible; }
.flt-tool-panel:first-child { margin-top: 0; }
.flt-tool-header {
  appearance: none; display: flex; justify-content: space-between; align-items: flex-start;
  width: 100%; height: auto; min-height: 0; padding: 7px 8px; border: 0; border-radius: 8px;
  background: transparent; color: var(--flt-text); cursor: pointer; font: inherit; text-align: left;
}
.flt-tool-header:hover { background: color-mix(in srgb, var(--flt-accent) 10%, transparent); }
.flt-tool-header.last-opened { box-shadow: inset 3px 0 0 var(--flt-accent); }
.flt-tool-title { min-width: 0; flex: 1; font-size: 12px; font-weight: 700; white-space: normal; overflow-wrap: anywhere; }
.flt-tool-chevron { flex: none; padding: 1px 0 0 6px; border: 0; background: none; color: var(--flt-muted); font-size: 13px; line-height: 1; }
.flt-tool-body { padding: 0 10px 8px; }
.flt-tool-body:not(.flt-tool-hidden) {
  display: grid; height: auto; min-height: 0; max-height: none; overflow: visible;
  grid-template-columns: minmax(0, 1fr); align-items: stretch; column-gap: 8px;
}
.flt-tool-body > :is(.flt-button, .flt-toggle-row, .flt-field) { min-width: 0; }
.flt-control-grid > .flt-button, .flt-feature-content > .flt-button, .flt-tool-body > .flt-button {
  width: 100%; min-height: 28px; margin-top: 6px;
}
.flt-tool-hidden { display: none !important; }
.flt-feature-content { display: grid; grid-template-columns: minmax(0, 1fr); gap: 0; min-width: 0; }
.flt-field { display: grid; gap: 3px; margin-block: 4px; min-width: 0; }
.flt-label { min-width: 0; color: var(--flt-muted); font-size: 11px; line-height: 1.25; white-space: normal; overflow-wrap: anywhere; }
.flt-input {
  width: 100%; height: auto; min-height: var(--flt-control-height); border: 1px solid var(--flt-border);
  border-radius: var(--flt-radius-small); background: var(--flt-surface); color: var(--flt-text);
  padding: 5px 7px; font: inherit; line-height: 1.25;
}
.flt-input option { background: var(--flt-surface); color: var(--flt-text); }
.flt-field-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 6px; align-items: start; }
.flt-field-row > .flt-field { min-width: 0; }
.flt-panel .flt-field-row { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.flt-panel .flt-three-columns { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.flt-panel .flt-control-grid:not([hidden]) { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 8px; row-gap: 0; align-items: stretch; }
.flt-control-grid > .flt-field-row { display: contents; }
.flt-control-grid > .flt-field-row.flt-three-columns { display: grid; grid-column: 1 / -1; grid-template-columns: repeat(3, minmax(0, 1fr)); }
.flt-control-grid > .flt-basic-section-title, .flt-control-grid > .flt-basic-subsection, .flt-control-grid > .flt-button { grid-column: 1 / -1; }
.flt-panel .flt-control-grid .flt-input, .flt-panel .flt-three-columns .flt-input { width: 100%; max-width: 100%; }
.flt-three-columns > .flt-field > .flt-label { font-size: 9px; letter-spacing: -0.1px; white-space: nowrap; }
.flt-three-columns > .flt-field > .flt-input { padding: 4px 5px; font-size: 10px; }
.flt-control-grid > .flt-toggle-row { border-top: 0; gap: 5px; padding-block: 4px; }
.flt-match-scopes { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 3px 6px; }
.flt-match-scopes > .flt-basic-section-title { grid-column: 1 / -1; }
.flt-match-scopes > .flt-toggle-row { min-width: 0; align-items: center; gap: 3px; padding: 2px 0; border-top: 0; }
.flt-match-scopes > .flt-toggle-row > .flt-label { min-width: 0; font-size: 9px; }
.flt-match-scopes > .flt-toggle-row > .flt-toggle { flex: none; }
.flt-inline-setting-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(104px, 1fr)); align-items: stretch; gap: 6px; }
.flt-inline-setting-row > .flt-toggle-row { min-width: 0; padding: 0; border: 0; }
.flt-inline-setting-row > .flt-toggle-row > .flt-label { font-size: 10px; }
.flt-inline-setting-row > .flt-toggle-row { flex-direction: row; justify-content: space-between; min-height: var(--flt-control-height); }
.flt-inline-setting-row > .flt-field { margin: 0; }
.flt-inline-setting-row > .flt-field > .flt-label { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; }
.flt-inline-setting-row .flt-input { width: 100%; max-width: 100%; }
.flt-inline-setting-row .flt-button { white-space: nowrap; padding-inline: 6px; }
.flt-appearance-settings { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 4px 7px; }
.flt-appearance-settings > .flt-basic-section-title { grid-column: 1 / -1; }
.flt-appearance-settings > .flt-toggle-row { min-width: 0; padding: 2px 0; border-top: 0; gap: 4px; }
.flt-appearance-settings > .flt-toggle-row > .flt-label { font-size: 10px; }
.flt-appearance-settings > .flt-field { margin: 0; }
.flt-appearance-settings > [role="status"] { grid-column: 1 / -1; }
.flt-appearance-controls { align-items: end !important; }
.flt-control-stack { display: grid; gap: 6px; }
.flt-soft-block-person { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.flt-soft-block-person > span { min-width: 0; overflow-wrap: anywhere; }
.flt-soft-block-person > button { flex: none; }
.flt-panel .flt-shortcut-editor { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 70px) auto; align-items: center; gap: 6px; margin-block: 5px; }
.flt-shortcut-editor > .flt-field { display: contents; }
.flt-panel .flt-shortcut-editor .flt-input { width: 100%; max-width: 100%; }
.flt-panel .flt-shortcut-editor .flt-button { padding: 4px 6px; font-size: 11px; }
.flt-toggle-row {
  display: flex; align-items: flex-start; justify-content: space-between; gap: 10px;
  height: auto; min-height: var(--flt-control-height); padding: 6px 0;
}
.flt-toggle-row + .flt-toggle-row { border-top: 1px solid #26262b; }
.flt-toggle-row > .flt-label { flex: 1 1 auto; }
.flt-panel .flt-button { height: auto; min-height: var(--flt-control-height); padding: 5px 8px; }
.flt-panel .flt-input {
  width: 100%; min-width: 0; max-width: 100%; height: auto; min-height: var(--flt-control-height); padding: 4px 7px;
}
.flt-panel .flt-inline-setting-row .flt-input { width: 100%; max-width: 100%; }
.flt-panel .flt-field-row .flt-input { width: 100%; max-width: 100%; }
.flt-panel .flt-input[type="file"] { width: 100%; max-width: 100%; }
.flt-toggle {
  position: relative; box-sizing: border-box; flex: 0 0 var(--flt-toggle-width); width: var(--flt-toggle-width); height: var(--flt-toggle-height); min-width: var(--flt-toggle-width);
  min-height: var(--flt-toggle-height); margin-top: 1px; padding: 0;
  border: 1px solid color-mix(in srgb, var(--flt-border) 88%, var(--flt-muted) 12%);
  border-radius: 6px;
  background: color-mix(in srgb, var(--flt-background) 84%, var(--flt-surface) 16%);
  background-image: none;
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 1.8%);
  cursor: pointer;
  transition: .15s background, .15s border-color;
}
.flt-toggle-indicator {
  display: block; position: absolute; top: 2px; left: 2px; width: var(--flt-toggle-knob-size); height: var(--flt-toggle-knob-size); box-sizing: border-box;
  border: 0; border-radius: 4px;
  background: color-mix(in srgb, var(--flt-muted) 82%, var(--flt-text) 18%);
  box-shadow: none;
  transform: translateX(0); transition: .15s transform, .15s background;
}
.flt-toggle[aria-checked="true"] {
  border-color: color-mix(in srgb, var(--flt-border) 52%, var(--flt-accent) 48%);
  background: color-mix(in srgb, var(--flt-surface) 72%, var(--flt-accent) 28%);
  background-image: none;
}
.flt-toggle[aria-checked="true"] .flt-toggle-indicator {
  transform: translateX(var(--flt-toggle-knob-size)); background: var(--flt-text);
}
.flt-theme-field { display: grid; gap: 6px; min-width: 0; }
.flt-control-grid > .flt-theme-field, .flt-appearance-controls > .flt-theme-field { grid-column: 1 / -1; }
.flt-theme-swatches { display: flex; align-items: center; gap: 6px; min-height: 28px; flex-wrap: wrap; }
.flt-theme-swatch {
  appearance: none; box-sizing: border-box; flex: 0 0 22px; width: 22px; height: 22px; min-width: 22px;
  min-height: 22px; max-width: 22px; max-height: 22px; padding: 0; border: 2px solid var(--flt-border);
  border-radius: 5px; cursor: pointer; background-repeat: no-repeat; background-size: 100% 100%;
}
.flt-theme-swatch.is-on { border-color: var(--flt-text); box-shadow: 0 0 0 2px var(--flt-accent); }
.flt-cluster[data-flt-menu-width="compact"] .flt-panel,
.flt-cluster[data-flt-menu-width="compact"] > .flt-update-notice[data-flt-placement="menu"],
.flt-panel[data-flt-menu-width="compact"], html.flt-menu-width-compact .flt-panel,
html.flt-menu-width-compact .flt-update-notice,
.flt-update-notice[data-flt-menu-width="compact"] { width: min(var(--flt-menu-width-compact), calc(100vw - 24px)); }
.flt-cluster[data-flt-menu-width="narrow"] .flt-panel,
.flt-cluster[data-flt-menu-width="narrow"] > .flt-update-notice[data-flt-placement="menu"],
.flt-panel[data-flt-menu-width="narrow"], html.flt-menu-width-narrow .flt-panel,
html.flt-menu-width-narrow .flt-update-notice,
.flt-update-notice[data-flt-menu-width="narrow"] { width: min(var(--flt-menu-width-narrow), calc(100vw - 24px)); }
.flt-cluster[data-flt-menu-width="full"] .flt-panel,
.flt-cluster[data-flt-menu-width="full"] > .flt-update-notice[data-flt-placement="menu"] {
  width: min(var(--flt-menu-width-full), calc(100vw - 24px));
}
.flt-cluster[data-flt-menu-width="compact"] .flt-progress-stack,
.flt-cluster[data-flt-menu-width="compact"] .flt-progress-stack > .flt-update-notice { width: min(var(--flt-menu-width-compact), calc(100vw - 24px)); }
.flt-cluster[data-flt-menu-width="narrow"] .flt-progress-stack,
.flt-cluster[data-flt-menu-width="narrow"] .flt-progress-stack > .flt-update-notice { width: min(var(--flt-menu-width-narrow), calc(100vw - 24px)); }
html.flt-menu-width-compact .flt-panel .flt-control-grid:not([hidden]),
html.flt-menu-width-narrow .flt-panel .flt-control-grid:not([hidden]),
html.flt-menu-width-compact .flt-appearance-settings,
html.flt-menu-width-narrow .flt-appearance-settings,
html.flt-menu-width-compact .flt-panel .flt-field-row,
html.flt-menu-width-narrow .flt-panel .flt-field-row,
html.flt-menu-width-compact .flt-panel .flt-three-columns,
html.flt-menu-width-narrow .flt-panel .flt-three-columns,
html.flt-menu-width-compact .flt-match-scopes,
html.flt-menu-width-narrow .flt-match-scopes,
.flt-panel[data-flt-menu-width="compact"] .flt-control-grid:not([hidden]),
.flt-panel[data-flt-menu-width="narrow"] .flt-control-grid:not([hidden]),
.flt-panel[data-flt-menu-width="compact"] .flt-appearance-settings,
.flt-panel[data-flt-menu-width="narrow"] .flt-appearance-settings,
.flt-panel[data-flt-menu-width="compact"] .flt-field-row,
.flt-panel[data-flt-menu-width="narrow"] .flt-field-row,
.flt-panel[data-flt-menu-width="compact"] .flt-three-columns,
.flt-panel[data-flt-menu-width="narrow"] .flt-three-columns,
.flt-panel[data-flt-menu-width="compact"] .flt-match-scopes,
.flt-panel[data-flt-menu-width="narrow"] .flt-match-scopes {
  grid-template-columns: minmax(0, 1fr);
}
html.flt-basic-high-contrast .flt-toggle, html.flt-pro-high-contrast .flt-toggle,
.flt-root[data-flt-contrast="true"] .flt-toggle {
  border: 2px solid #fff; background: #050505; background-image: none;
}
html.flt-basic-high-contrast .flt-toggle-indicator, html.flt-pro-high-contrast .flt-toggle-indicator,
.flt-root[data-flt-contrast="true"] .flt-toggle-indicator {
  top: 0; left: 0; border: 1px solid #050505; background: #fff;
}
html.flt-basic-high-contrast .flt-toggle[aria-checked="true"],
html.flt-pro-high-contrast .flt-toggle[aria-checked="true"],
.flt-root[data-flt-contrast="true"] .flt-toggle[aria-checked="true"] {
  background: #fff; border-color: #fff; background-image: none;
}
html.flt-basic-high-contrast .flt-toggle[aria-checked="true"] .flt-toggle-indicator,
html.flt-pro-high-contrast .flt-toggle[aria-checked="true"] .flt-toggle-indicator,
.flt-root[data-flt-contrast="true"] .flt-toggle[aria-checked="true"] .flt-toggle-indicator {
  background: #050505; border-color: #fff; transform: translateX(var(--flt-toggle-knob-size));
}
html[data-flt-pro-theme="pride"] .flt-toggle[aria-checked="true"],
html[data-flt-pro-accent="pride"] .flt-toggle[aria-checked="true"],
.flt-root[data-flt-theme-skin="pride"] .flt-toggle[aria-checked="true"] {
  background-image: none !important;
  border-color: color-mix(in srgb, var(--flt-border) 52%, var(--flt-accent) 48%) !important;
  background: color-mix(in srgb, var(--flt-surface) 72%, var(--flt-accent) 28%) !important;
}
html[data-flt-pro-theme="pride"] .flt-panel, html[data-flt-pro-accent="pride"] .flt-panel,
.flt-root[data-flt-theme-skin="pride"].flt-panel {
  border: 1px solid transparent;
  background-image: linear-gradient(var(--flt-background), var(--flt-background)),
    linear-gradient(90deg, #c97b83, #d29a70, #d0c07d, #70a886, #7091b6, #a27ba9);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}
html[data-flt-pro-theme="pride"] .flt-header-divider, html[data-flt-pro-accent="pride"] .flt-header-divider,
.flt-root[data-flt-theme-skin="pride"] .flt-header-divider {
  height: 2px; border-radius: 2px; opacity: .9;
  background: linear-gradient(90deg, #c97b83, #d29a70, #d0c07d, #70a886, #7091b6, #a27ba9);
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 16%, #000 84%, transparent 100%);
  mask-image: linear-gradient(90deg, transparent 0%, #000 16%, #000 84%, transparent 100%);
}
html[data-flt-pro-theme="pride"] .flt-tool-header.last-opened,
html[data-flt-pro-accent="pride"] .flt-tool-header.last-opened,
.flt-root[data-flt-theme-skin="pride"] .flt-tool-header.last-opened,
.flt-root[data-flt-theme-skin="pride"] .flt-button.last-opened {
  box-shadow: none; position: relative;
}
html[data-flt-pro-theme="pride"] .flt-tool-header.last-opened::before,
html[data-flt-pro-accent="pride"] .flt-tool-header.last-opened::before,
.flt-root[data-flt-theme-skin="pride"] .flt-tool-header.last-opened::before,
.flt-root[data-flt-theme-skin="pride"] .flt-button.last-opened::before {
  content: ""; position: absolute; left: 0; top: 4px; bottom: 4px; width: 2px; border-radius: 2px;
  background: linear-gradient(180deg, #c97b83, #d29a70, #d0c07d, #70a886, #7091b6, #a27ba9);
}
.flt-root[data-flt-theme-skin="pride"] .flt-tool-header:hover,
.flt-root[data-flt-theme-skin="pride"] .flt-tool-header:focus-visible,
.flt-root[data-flt-theme-skin="pride"] .flt-tool-header[aria-expanded="true"] {
  background: color-mix(in srgb, var(--flt-surface) 88%, var(--flt-accent) 12%);
}
.flt-root[data-flt-theme-skin="pride"] .flt-header-version {
  border: 1px solid var(--flt-border); border-radius: 6px; background: var(--flt-background); color: var(--flt-text);
}
.flt-root[data-flt-theme-skin="pride"] .flt-header-version:hover,
.flt-root[data-flt-theme-skin="pride"] .flt-header-version:focus-visible {
  border-color: transparent;
  background-image: linear-gradient(var(--flt-surface), var(--flt-surface)),
    linear-gradient(90deg, #c97b83, #d29a70, #d0c07d, #70a886, #7091b6, #a27ba9);
  background-origin: border-box; background-clip: padding-box, border-box;
}
.flt-root[data-flt-theme-skin="pride"] .flt-launcher-button[aria-expanded="true"] {
  border: 1px solid transparent;
  background-image: linear-gradient(var(--flt-surface), var(--flt-surface)),
    linear-gradient(90deg, #c97b83, #d29a70, #d0c07d, #70a886, #7091b6, #a27ba9);
  background-origin: border-box; background-clip: padding-box, border-box;
}
@media (forced-colors: active) {
  .flt-toggle { forced-color-adjust: none; border: 1px solid CanvasText; background: Canvas; background-image: none; }
  .flt-toggle-indicator { border-color: CanvasText; background: CanvasText; }
  .flt-toggle[aria-checked="true"] { border-color: Highlight; background: Highlight; background-image: none; }
  .flt-toggle[aria-checked="true"] .flt-toggle-indicator { border-color: HighlightText; background: HighlightText; }
}
.flt-list { display: grid; gap: 5px; margin: 0; padding: 0; list-style: none; }
.flt-list-item { border: 1px solid var(--flt-border); border-radius: 7px; padding: 7px; background: color-mix(in srgb, var(--flt-surface-raised) 55%, transparent); }
.flt-list-item > div { display: grid; gap: 5px; }
.flt-list-item .flt-button { width: fit-content; }
.flt-visit-history-status { margin: 3px 0 5px !important; }
.flt-visit-history-list { max-height: 260px; overflow-y: auto; overscroll-behavior: contain; }
.flt-visit-history-item { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; gap: 7px; }
.flt-visit-history-item > div { min-width: 0; }
.flt-visit-history-item a { color: var(--flt-text); font-weight: 700; overflow-wrap: anywhere; }
.flt-visit-history-item time { display: block; margin-top: 2px; }
.flt-empty { border: 1px dashed var(--flt-border); border-radius: 7px; padding: 10px; color: var(--flt-muted); text-align: center; font-size: 11px; }
.flt-chip-field { display: grid; grid-template-columns: minmax(0, 1fr); gap: 3px; min-width: 0; }
.flt-chip-input { width: 50%; }
.flt-chip-search { width: 100%; max-width: 100%; font-size: 10px; }
.flt-chip-row, .flt-basic-actions, .flt-pro-person-actions, .flt-pro-personalize-actions { display: flex; flex-wrap: wrap; gap: 4px; align-items: center; }
.flt-chip-row:empty { display: none; }
.flt-chip { display: inline-flex; align-items: center; gap: 3px; min-width: 0; padding: 2px 5px; border: 1px solid var(--flt-border); border-radius: 5px; background: var(--flt-surface); color: var(--flt-text); font-size: 10px; line-height: 1.2; }
.flt-chip-saved { border-style: dashed; color: var(--flt-muted); cursor: pointer; }
.flt-chip button { width: 16px; height: 16px; padding: 0; border: 0; background: transparent; color: inherit; cursor: pointer; font: 13px/1 system-ui, sans-serif; }
.flt-chip button:hover { color: var(--flt-accent); }
.flt-nested-accordion { display: grid; gap: 4px; }
.flt-nested-panel { min-width: 0; overflow: hidden; border: 1px solid color-mix(in srgb, var(--flt-accent) 34%, var(--flt-border)); border-radius: 9px; background: var(--flt-background); }
.flt-nested-header { display: flex; align-items: center; justify-content: space-between; gap: 7px; width: 100%; min-height: 27px; padding: 4px 7px; border: 0; background: transparent; color: var(--flt-text); cursor: pointer; font: 750 10px/1.2 system-ui, sans-serif; text-align: left; }
.flt-nested-header:hover, .flt-nested-header[aria-expanded="true"] { background: color-mix(in srgb, var(--flt-accent) 10%, transparent); }
.flt-nested-body { margin: 0; padding: 5px; border: 0; border-top: 1px solid var(--flt-border); border-radius: 0; background: var(--flt-background); }
.flt-nested-body[hidden] { display: none; }
.flt-chip-row .flt-button, .flt-basic-actions > .flt-button, .flt-pro-person-actions .flt-button, .flt-pro-people-views .flt-button { min-height: var(--flt-control-height); padding: 4px 7px; font-size: 11px; }
.flt-basic-actions > .flt-field { flex: 1 1 140px; }
.flt-compact-action-row { display: flex; flex-wrap: wrap; gap: 5px; align-items: flex-end; }
.flt-compact-action-row > .flt-field { flex: 1 1 140px; margin-bottom: 0; }
.flt-compact-action-row > .flt-button { flex: 0 1 auto; }
.flt-help-anchor, .flt-has-tooltip { cursor: help; position: relative; }
.flt-help-anchor[data-flt-tip]::after, .flt-has-tooltip[data-flt-tip]::after {
  content: attr(data-flt-tip);
  position: absolute;
  z-index: 4;
  left: 8px;
  top: calc(100% + 5px);
  width: max-content;
  max-width: min(260px, calc(100vw - 32px));
  padding: 6px 8px;
  border: 1px solid var(--flt-border);
  border-radius: 7px;
  background: var(--flt-surface-raised);
  color: var(--flt-text);
  box-shadow: 0 8px 24px rgb(0 0 0 / 45%);
  font-size: 11px;
  font-weight: 500;
  line-height: 1.35;
  overflow-wrap: anywhere;
  white-space: normal;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-2px);
  transition: opacity 120ms ease 180ms, transform 120ms ease 180ms;
}
.flt-help-anchor[data-flt-tip]:hover::after, .flt-help-anchor[data-flt-tip]:focus-visible::after,
.flt-has-tooltip[data-flt-tip]:hover::after, .flt-has-tooltip[data-flt-tip]:focus-visible::after {
  opacity: 1;
  transform: translateY(0);
}
.flt-button[aria-pressed="true"] { background: var(--flt-accent); color: var(--flt-accent-contrast); border-color: var(--flt-accent); }
.flt-basic-section, .flt-pro-personalize > section { margin: 5px 0; padding: 6px; border: 1px solid #2a2a31; border-radius: 7px; background: color-mix(in srgb, var(--flt-surface) 82%, transparent); }
.flt-panel .flt-basic-section.flt-nested-body { margin: 0; padding: 4px 6px; border: 0; border-top: 1px solid var(--flt-border); border-radius: 0; background: transparent; }
.flt-panel .flt-basic-section.flt-feature-content { margin: 0; padding: 0; border: 0; background: transparent; }
.flt-feature-content > .flt-basic-section-title { display: none; }
.flt-help-anchor[data-flt-tip]::after, .flt-has-tooltip[data-flt-tip]::after { display: none; }
.flt-help-tooltip { position: fixed; z-index: 2147483600; width: max-content; max-width: min(280px, calc(100vw - 16px)); padding: 6px 8px; border: 1px solid var(--flt-border); border-radius: 7px; background: var(--flt-surface-raised); color: var(--flt-text); box-shadow: var(--flt-shadow); font-size: 11px; line-height: 1.35; pointer-events: none; }
.flt-help-tooltip[hidden] { display: none; }
.flt-support-actions { display: flex; flex-wrap: wrap; gap: 4px; padding-top: 5px; }
.flt-diagnostics-panel { display: grid; gap: 5px; margin-top: 6px; padding-top: 6px; border-top: 1px solid var(--flt-border); }
.flt-diagnostics-actions { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; }
.flt-diagnostics-actions > .flt-button { width: 100%; }
.flt-diagnostics-panel > h3 { margin: 0; }
.flt-diagnostics-panel > p { margin: 0; }
.flt-inline-report { max-height: 160px; margin: 0; overflow: auto; overscroll-behavior: contain; padding: 7px; border: 1px solid #2b2b31; border-radius: 7px; background: #101014; color: #b8b8c0; box-shadow: inset 0 2px 6px rgb(0 0 0 / 40%); font: 9px/1.45 ui-monospace, SFMono-Regular, Consolas, monospace; white-space: pre-wrap; overflow-wrap: anywhere; }
.flt-root .flt-header-version, .flt-root .flt-update-version { border-radius: 6px; }
.flt-feature-content.flt-basic-section { margin: 0; padding: 0; border: 0; border-radius: 0; background: transparent; }
.flt-basic-section-title, .flt-tool-body h2, .flt-tool-body h3 { margin: 1px 0 2px; color: var(--flt-accent-secondary, var(--flt-accent)); font-size: 8px; font-weight: 900; line-height: 1.2; letter-spacing: .08em; text-transform: uppercase; }
.flt-basic-subsection { margin: 7px 0 0; padding: 8px 0 0; border-top: 1px solid var(--flt-border); }
.flt-tool-body p { margin: 5px 0; font-size: 11px; color: var(--flt-muted); }
.flt-root [role="status"]:empty { display: none; }
.flt-basic-saved-term { display: flex; flex-wrap: wrap; gap: 5px; align-items: flex-start; padding: 3px 0; }
.flt-basic-saved-term > span { flex: 1 1 100%; min-width: 0; overflow-wrap: anywhere; }
.flt-basic-saved-term .flt-button { flex: 0 1 auto; padding: 3px 6px; font-size: 10px; }
.flt-basic-saved-terms { margin-top: 5px; }
.flt-tool-body dl { margin: 5px 0; }
.flt-tool-body dt { color: var(--flt-muted); font-size: 10px; }
.flt-tool-body dd { margin: 0 0 4px; }
.flt-shortcut-help { margin: 4px 0 8px; padding: 10px; border: 1px solid var(--flt-border); border-radius: 8px; background: var(--flt-surface); color: var(--flt-text); }
.flt-shortcut-help[hidden] { display: none !important; }
.flt-shortcut-help h3 { margin: 0 0 6px; font-size: 13px; }
.flt-shortcut-disclosure { margin: 0; padding: 6px 0; border-top: 1px solid var(--flt-border); }
.flt-shortcut-disclosure summary { cursor: pointer; font-size: 12px; font-weight: 700; }
.flt-shortcut-help p { margin: 0 0 8px; color: var(--flt-muted); font-size: 11px; line-height: 1.5; }
.flt-shortcut-help .flt-shortcut-list { grid-template-columns: minmax(0, 1fr); margin: 0; }
.flt-shortcut-help kbd { display: inline-block; padding: 2px 5px; border: 1px solid var(--flt-border); border-radius: 4px; background: var(--flt-background); color: var(--flt-text); font: 600 11px/1.4 ui-monospace, monospace; }
.flt-native-shortcuts { margin-top: 10px; padding-top: 8px; border-top: 1px solid var(--flt-border); }
.flt-native-shortcuts summary { cursor: pointer; font-size: 12px; }
.flt-native-shortcuts h4 { margin: 10px 0 4px; font-size: 11px; color: var(--flt-muted); }
.flt-native-shortcut-list { margin: 0; display: grid; gap: 4px; }
.flt-reference-list { display: grid; gap: 7px; margin: 8px 0; }
.flt-reference-list > div { min-width: 0; padding: 7px; border: 1px solid var(--flt-border); border-radius: 6px; }
.flt-reference-list dt { font-size: 12px; font-weight: 700; }
.flt-reference-list dd { margin: 3px 0 0; font-size: 11px; overflow-wrap: anywhere; }
.flt-reference-list a { color: var(--flt-accent); text-decoration: underline; }
.flt-glossary-results { max-height: 300px; overflow-y: auto; overscroll-behavior: contain; }
.flt-glossary-entry[hidden] { display: none !important; }
.flt-gender-options { max-height: 230px; overflow-y: auto; overscroll-behavior: contain; }
.flt-native-shortcut-row { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; font-size: 11px; }
.flt-native-shortcut-row dt, .flt-native-shortcut-row dd { margin: 0; min-width: 0; overflow-wrap: anywhere; }
.flt-shortcut-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 4px; }
.flt-shortcut-row { display: flex; align-items: baseline; justify-content: space-between; gap: 6px; min-width: 0; padding: 3px 5px; border: 1px solid var(--flt-border); border-radius: 5px; }
.flt-shortcut-row dt, .flt-shortcut-row dd { min-width: 0; margin: 0; overflow-wrap: anywhere; }
.flt-shortcut-row dd { color: var(--flt-text); font-weight: 700; }
.flt-root[data-flt-product="basic"], .flt-launcher-button[data-flt-product="basic"] { --flt-accent: #d7dee8; --flt-accent-secondary: #343a46; --flt-focus: #d7dee8; }
.flt-root[data-flt-product="pro"], .flt-launcher-button[data-flt-product="pro"] { --flt-accent: #f4c95d; --flt-accent-secondary: #a92d32; --flt-focus: #f4c95d; }
.flt-root[data-flt-product="social"], .flt-launcher-button[data-flt-product="social"] { --flt-accent: #4f8ef7; --flt-accent-secondary: #22b8cf; --flt-focus: #4f8ef7; }
.flt-root[data-flt-product="vault"], .flt-launcher-button[data-flt-product="vault"] { --flt-accent: #45c878; --flt-accent-secondary: #168f8a; --flt-focus: #45c878; }
.flt-panel[data-flt-product] .flt-tool-panel:has(.flt-tool-header[aria-expanded="true"]) { border-left-color: var(--flt-accent); }
.flt-panel [data-flt-vault-action="true"], .flt-panel .flt-vault-batch-status { border-left: 3px solid var(--flt-accent); }
.flt-social-view, .flt-vault-view { display: grid; gap: 5px; }
.flt-social-filter-panel { margin: 4px 0 6px; padding: 6px; border: 1px solid var(--flt-border); border-radius: 7px; background: var(--flt-surface); }
.flt-social-event-mode { min-width: 170px; }
.flt-social-event-mode .flt-input { width: 100%; max-width: 100%; }
.flt-social-event-row, .flt-social-saved-row, .flt-vault-library-row, .flt-vault-save-row { display: grid; gap: 4px; }
.flt-social-event-detail { color: var(--flt-muted); font-size: 10px; }
.flt-vault-library-row > span, .flt-vault-save-row > span { overflow-wrap: anywhere; font-size: 11px; }
.flt-vault-view > h2 + p, .flt-social-view > h2 + p { padding-left: 6px; border-left: 2px solid var(--flt-accent); }
.flt-dialog-backdrop {
  position: fixed; inset: 0; z-index: var(--flt-z-dialog); display: grid; place-items: center;
  padding: 18px; background: rgb(0 0 0 / 62%);
}
.flt-dialog {
  width: min(440px, 100%); max-height: calc(100vh - 36px); overflow: auto;
  border: 1px solid var(--flt-border); border-radius: var(--flt-radius-large);
  background: var(--flt-background); color: var(--flt-text); box-shadow: var(--flt-shadow); padding: 18px;
}
.flt-dialog-title { margin: 0 0 8px; font-size: 18px; }
.flt-dialog-description { margin: 0; color: var(--flt-muted); white-space: pre-wrap; }
.flt-dialog-actions { display: flex; flex-wrap: wrap; justify-content: flex-end; align-items: stretch; gap: 6px; margin-top: 12px; }
.flt-dialog-actions > .flt-button, .flt-notice-actions > .flt-button, .flt-support-actions > .flt-button { min-height: var(--flt-control-height); }
.flt-notice {
  position: fixed; z-index: var(--flt-z-notice); right: 84px; top: 25%;
  width: min(340px, calc(100vw - 108px)); border: 1px solid var(--flt-border);
  border-radius: var(--flt-radius-large); background: var(--flt-background); box-shadow: var(--flt-shadow);
  padding: 14px;
}
.flt-notice[data-flt-priority="critical"], .flt-notice[data-flt-priority="high"] { border-color: var(--flt-warning); }
.flt-notice-title { margin: 0 0 5px; font-size: 16px; }
.flt-notice-message { margin: 0; color: var(--flt-muted); }
.flt-notice-list { margin: 10px 0 0; padding-inline-start: 20px; }
.flt-notice-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
.flt-report { max-height: 50vh; overflow: auto; white-space: pre-wrap; word-break: break-word; color: var(--flt-muted); }
.flt-release-summary { margin-top: 12px; }
.flt-live-region { position: fixed; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.flt-presentation-indicator, .flt-card-chip {
  position: relative; display: inline-block; margin: 4px; padding: 1px 5px; border: 1px solid currentColor;
  border-radius: 5px; background: var(--flt-background); color: var(--flt-text);
  font: 600 9px/1.3 system-ui, sans-serif; cursor: help;
}
.flt-profile-card-host { position: relative !important; }
.flt-profile-card-chips { position: absolute; z-index: 3; inset: 5px 5px auto auto; display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 3px; max-width: calc(100% - 10px); }
.flt-profile-card-chips .flt-button, .flt-profile-card-chips .flt-card-chip { height: auto; min-height: 0; margin: 0; padding: 2px 6px; border-radius: 5px; font-size: 9px; line-height: 1.2; }
.flt-card-chip[data-flt-tip]:hover::after, .flt-card-chip[data-flt-tip]:focus-visible::after, .flt-card-chip[aria-expanded="true"]::after {
  content: attr(data-flt-tip);
  position: absolute; z-index: 6; left: 0; top: calc(100% + 4px); width: max-content;
  max-width: min(240px, calc(100vw - 24px)); padding: 6px 8px; border: 1px solid var(--flt-border);
  border-radius: 7px; background: var(--flt-surface-raised); color: var(--flt-text);
  box-shadow: var(--flt-shadow); font: 500 11px/1.35 system-ui, sans-serif; white-space: normal;
  text-align: left; pointer-events: none;
}
.flt-state-highlighted { outline: 2px solid var(--flt-accent) !important; outline-offset: 2px; }
.flt-state-dimmed { opacity: .82; }
.flt-state-hidden { display: none !important; }
.flt-media-blurred { filter: blur(var(--flt-media-blur, 4px)); }
.flt-media-hidden { visibility: hidden !important; }
@media (max-width: 560px) {
  .flt-cluster { right: 8px; bottom: 8px; }
  .flt-panel { width: min(var(--flt-menu-width-full), calc(100vw - 24px)); border-radius: var(--flt-radius-medium); }
  .flt-panel .flt-input { width: 100%; max-width: 100%; }
  .flt-field-row { grid-template-columns: minmax(0, 1fr); }
  .flt-diagnostics-actions { grid-template-columns: minmax(0, 1fr); }
  .flt-notice { inset: auto 8px 76px 8px; width: auto; }
}
@media (max-width: 360px) {
  .flt-panel, .flt-update-notice { width: calc(100vw - 24px); }
}
@media (prefers-reduced-motion: reduce) {
  .flt-root *, .flt-root *::before, .flt-root *::after {
    animation-duration: .01ms !important; animation-iteration-count: 1 !important;
    scroll-behavior: auto !important; transition-duration: .01ms !important;
  }
}
`;
  var MENU_WIDTHS = Object.freeze(["full", "compact", "narrow"]);
  function applyMenuWidth(document, width) {
    let next;
    switch (width) {
      case "compact":
      case "narrow":
      case "full":
        next = width;
        break;
      default:
        next = "full";
        break;
    }
    document.documentElement.classList.toggle("flt-menu-width-compact", next === "compact");
    document.documentElement.classList.toggle("flt-menu-width-narrow", next === "narrow");
    return next;
  }
  var ThemeEngine = class {
    #document;
    #overrides = /* @__PURE__ */ new Map();
    #style;
    constructor({ document }) {
      if (!document?.createElement) throw new ContractError("Theme engine requires a document");
      this.#document = document;
    }
    mount() {
      if (this.#style?.isConnected) return this.#style;
      const existing = this.#document.getElementById("flt-core-theme");
      if (existing) {
        this.#style = existing;
        return existing;
      }
      const style = this.#document.createElement("style");
      style.id = "flt-core-theme";
      style.dataset.fltOwner = "core";
      style.textContent = BASE_CSS;
      (this.#document.head ?? this.#document.documentElement).append(style);
      this.#style = style;
      return style;
    }
    setTokens(tokens) {
      if (!tokens || typeof tokens !== "object" || Array.isArray(tokens)) {
        throw new ContractError("Theme token overrides must be an object");
      }
      for (const [name, value] of Object.entries(tokens)) {
        if (!THEME_TOKENS.includes(name) || typeof value !== "string" || value.trim().length === 0 || value.length > 200 || /[;{}]|url\s*\(/i.test(value)) {
          throw new ContractError("Unknown or invalid Core theme token", { name });
        }
        this.#overrides.set(name, value.trim());
        this.#document.documentElement.style.setProperty(`--flt-${name}`, value.trim());
      }
    }
    resetTokens() {
      for (const name of this.#overrides.keys()) {
        this.#document.documentElement.style.removeProperty(`--flt-${name}`);
      }
      this.#overrides.clear();
    }
    destroy() {
      this.resetTokens();
      this.#style?.remove();
      this.#style = void 0;
    }
  };

  // ../fl-tools-core/src/ui/shortcut-help.js
  var NATIVE_SHORTCUTS = {
    Sitewide: [
      ["?", "Show keyboard shortcuts"],
      ["/", "Focus navigation search"],
      [".", "Go to top of the page"]
    ],
    "Commenting & Replying": [
      ["C", "Comment / reply"],
      ["Ctrl+Enter", "Send"],
      ["Esc", "Exit input mode"],
      ["Ctrl+B", "Bold"],
      ["Ctrl+I", "Italic"],
      ["Ctrl+Shift+S", "Strikethrough"]
    ],
    Content: [
      ["C", "Comment"],
      ["L", "Love / Unlove"],
      ["B", "Bookmark / Unbookmark"],
      ["\u2192", "Next"],
      ["\u2190", "Previous"]
    ],
    Navigation: [
      ["G then H", "Go to home"],
      ["G then A", "Go to notifications"],
      ["G then P", "Go to your profile"],
      ["G then C", "Go to inbox"],
      ["G then E", "Go to explore"]
    ]
  };
  function nativeShortcutHelp(document) {
    const details = document.createElement("details");
    details.className = "flt-native-shortcuts";
    const summary = document.createElement("summary");
    summary.textContent = "FetLife native shortcuts";
    details.append(summary);
    for (const [title, shortcuts] of Object.entries(NATIVE_SHORTCUTS)) {
      const heading2 = document.createElement("h4");
      heading2.textContent = title;
      const list = document.createElement("dl");
      list.className = "flt-native-shortcut-list";
      for (const [keys, label] of shortcuts) {
        const row = document.createElement("div");
        row.className = "flt-native-shortcut-row";
        const term = document.createElement("dt");
        term.textContent = label;
        const definition = document.createElement("dd");
        const key = document.createElement("kbd");
        key.textContent = keys;
        definition.append(key);
        row.append(term, definition);
        list.append(row);
      }
      details.append(heading2, list);
    }
    return details;
  }

  // ../fl-tools-core/src/ui/terminology-help.js
  function sourceLink(document, label, url) {
    const link = document.createElement("a");
    link.textContent = label;
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.referrerPolicy = "no-referrer";
    return link;
  }
  function terminologyHelp(document, onLayout) {
    const fragment = document.createDocumentFragment();
    const genders = document.createElement("details");
    genders.className = "flt-native-shortcuts";
    const genderTitle = document.createElement("summary");
    genderTitle.textContent = "Gender reference";
    attachHelp(
      genderTitle,
      "An explicitly empty profile gender means Not applicable. An unreadable or unrecognized value remains Unknown. Codes are distinct; matching ignores case."
    );
    genders.append(genderTitle);
    for (const group of ["Profile abbreviations", "Other shorthand"]) {
      const heading2 = document.createElement("h4");
      heading2.textContent = group;
      const list2 = document.createElement("dl");
      list2.className = "flt-reference-list";
      for (const entry of GENDER_REFERENCE.filter((e) => e.group === group)) {
        const row = document.createElement("div");
        const term = document.createElement("dt");
        term.textContent = entry.code;
        const definition = document.createElement("dd");
        definition.append(sourceLink(document, entry.label, entry.url));
        row.append(term, definition);
        list2.append(row);
      }
      genders.append(heading2, list2);
    }
    const glossary = document.createElement("details");
    glossary.className = "flt-native-shortcuts";
    const title = document.createElement("summary");
    title.textContent = "Abbreviations & meanings";
    attachHelp(
      title,
      "Reference meanings depend on context. These definitions do not assign traits to a profile or change your filters."
    );
    const search = document.createElement("input");
    search.type = "search";
    search.className = "flt-input";
    search.placeholder = "Search a code or meaning";
    search.setAttribute("aria-label", "Search abbreviations");
    const status = document.createElement("p");
    status.className = "flt-glossary-status";
    status.setAttribute("role", "status");
    const list = document.createElement("dl");
    list.className = "flt-reference-list flt-glossary-results";
    const rows = ABBREVIATION_REFERENCE.map((entry) => {
      const row = document.createElement("div");
      row.className = "flt-glossary-entry";
      const term = document.createElement("dt");
      term.textContent = entry.code;
      const definition = document.createElement("dd");
      for (const meaning of entry.meanings) {
        const text2 = document.createElement("p");
        text2.textContent = meaning;
        definition.append(text2);
      }
      for (const { label, url } of entry.sources)
        definition.append(sourceLink(document, label, url), document.createTextNode(" "));
      row.append(term, definition);
      list.append(row);
      return row;
    });
    const filter = () => {
      const query = search.value.trim().toLocaleLowerCase();
      let count = 0;
      for (const row of rows) {
        row.hidden = !row.textContent.toLocaleLowerCase().includes(query);
        if (!row.hidden) count++;
      }
      status.textContent = count ? `${count} of ${rows.length} entries` : "No matching abbreviations";
      onLayout?.();
    };
    search.addEventListener("input", filter);
    status.textContent = `${rows.length} entries`;
    glossary.append(title, search, status, list);
    for (const section2 of [genders, glossary]) section2.addEventListener("toggle", () => onLayout?.());
    fragment.append(genders, glossary);
    return fragment;
  }

  // ../fl-tools-core/src/ui/shell.js
  var VIEWPORT_EDGE2 = 8;
  var ProductShell = class {
    #activeView;
    #document;
    #element;
    #headerItems;
    #layoutFrame;
    #zeroHeightRetry = false;
    #navButtons = /* @__PURE__ */ new Map();
    #navigationAliases = /* @__PURE__ */ new Map();
    #cluster;
    #getChangelog;
    #notice;
    #noticeTimer;
    #productName;
    #releaseUrl;
    #returnFocus;
    #version;
    #sections = /* @__PURE__ */ new Map();
    #views = /* @__PURE__ */ new Map();
    #support = /* @__PURE__ */ new Map();
    #layoutListener;
    #shortcutFooter;
    #shortcutHelp;
    #shortcutButton;
    #topContent;
    constructor({
      document,
      productId: productId2,
      productName,
      version,
      iconUrl,
      headerItems,
      navigation,
      footer = {},
      onDiagnostics,
      shortcutFooter: shortcutFooter2,
      topContent
    }) {
      if (!document?.createElement || !/^[a-z][a-z0-9-]*$/.test(productId2 ?? "") || !productName) {
        throw new ContractError("Product shell identity is invalid");
      }
      if (!Array.isArray(navigation) || navigation.length === 0) {
        throw new ContractError("Product shell navigation is required");
      }
      this.#document = document;
      this.#productName = productName;
      this.#version = version;
      this.#getChangelog = typeof footer.getChangelog === "function" ? footer.getChangelog : () => footer.changelog ?? null;
      this.#releaseUrl = footer.releaseUrl ?? "";
      const panel = document.createElement("aside");
      panel.addEventListener("toggle", () => this.#scheduleLayout(), true);
      panel.className = "flt-root flt-panel";
      panel.dataset.fltProduct = productId2;
      panel.dataset.fltVersion = version;
      panel.dataset.fltLayout = "product-accordion";
      panel.dataset.fltShell = "product-dock";
      applyChromeContract(panel);
      panel.hidden = true;
      const header = document.createElement("header");
      header.className = "flt-header";
      const top = document.createElement("div");
      top.className = "flt-menu-head";
      const brand = document.createElement("div");
      brand.className = "flt-header-brand";
      if (iconUrl) {
        const icon = document.createElement("img");
        icon.className = "flt-header-icon";
        icon.alt = "";
        icon.src = iconUrl;
        brand.append(icon);
      }
      const copy = document.createElement("div");
      copy.className = "flt-header-copy";
      const titleRow = document.createElement("div");
      titleRow.className = "flt-header-title-row";
      const title = document.createElement("h2");
      title.className = "flt-header-title";
      title.id = `flt-${productId2}-title`;
      title.textContent = productName;
      const versionButton = document.createElement("button");
      versionButton.className = "flt-header-version";
      versionButton.type = "button";
      versionButton.textContent = `v${version}`;
      versionButton.title = "View Changelog";
      versionButton.setAttribute("aria-label", `View ${productName} v${version} Changelog`);
      versionButton.addEventListener("click", (event) => {
        event.stopPropagation();
        this.showChangelog({ version });
      });
      titleRow.append(title, versionButton);
      this.#headerItems = document.createElement("div");
      this.#headerItems.className = "flt-header-items";
      copy.append(titleRow, this.#headerItems);
      brand.append(copy);
      const close = document.createElement("button");
      close.className = "flt-icon-button flt-header-close";
      close.type = "button";
      close.setAttribute("aria-label", `Close ${productName}`);
      close.textContent = "\xD7";
      close.addEventListener("click", () => this.close());
      top.append(brand, close);
      const divider = document.createElement("div");
      divider.className = "flt-header-divider";
      this.#notice = this.#buildNotice();
      this.#notice.dataset.fltProduct = productId2;
      header.append(top, divider);
      this.setHeaderItems(headerItems ?? [productName]);
      const body = document.createElement("main");
      body.className = "flt-panel-body";
      navigation.forEach((entry, index) => {
        if (!/^[a-z][a-z0-9-]*$/.test(entry?.id ?? "") || !entry?.label || this.#views.has(entry.id)) {
          throw new ContractError("Every shell destination requires a unique id and label");
        }
        const section2 = document.createElement("section");
        section2.className = "flt-tool-panel";
        const button = document.createElement("button");
        button.className = "flt-tool-header";
        button.type = "button";
        button.id = `flt-${productId2}-accordion-${entry.id}`;
        button.setAttribute("aria-expanded", "false");
        attachHelp(button, entry.description ?? CONTROL_HELP[entry.label]);
        if (entry.description) {
          button.classList.add("flt-has-tooltip");
          button.dataset.fltTip = entry.description;
          button.setAttribute("aria-description", entry.description);
        }
        const label = document.createElement("span");
        label.className = "flt-tool-title";
        label.textContent = entry.label;
        const chevron = document.createElement("span");
        chevron.className = "flt-tool-chevron";
        chevron.setAttribute("aria-hidden", "true");
        chevron.textContent = "\u25B8";
        button.append(label, chevron);
        const view = document.createElement("section");
        view.className = "flt-tool-body flt-tool-hidden";
        view.dataset.fltView = entry.id;
        view.id = `flt-${productId2}-view-${entry.id}`;
        view.setAttribute("role", "region");
        view.setAttribute("aria-labelledby", button.id);
        if (entry.content) view.append(entry.content);
        if (onDiagnostics && (entry.id === "diagnostics" || entry.aliases?.includes("diagnostics"))) {
          const support = document.createElement("div");
          support.className = "flt-diagnostics-panel";
          support.setAttribute("aria-live", "polite");
          support.textContent = "Loading page and plugin diagnostics\u2026";
          this.#support.set(entry.id, support);
          view.append(support);
          void onDiagnostics(support);
        }
        button.setAttribute("aria-controls", view.id);
        button.addEventListener("click", () => this.#toggleView(entry.id));
        button.addEventListener("keydown", (event) => this.#navigateAccordions(event, entry.id));
        section2.append(button, view);
        body.append(section2);
        this.#navButtons.set(entry.id, button);
        this.#sections.set(entry.id, section2);
        this.#views.set(entry.id, view);
        for (const alias of entry.aliases ?? []) {
          if (!/^[a-z][a-z0-9-]*$/.test(alias) || this.#navigationAliases.has(alias)) {
            throw new ContractError("Every shell destination alias must be unique");
          }
          this.#navigationAliases.set(alias, entry.id);
        }
        if (index === 0) this.#activeView = entry.id;
      });
      panel.append(header);
      if (topContent) this.setTopContent(topContent, { panel });
      panel.append(body);
      panel.setAttribute("aria-labelledby", title.id);
      panel.addEventListener("keydown", (event) => {
        if (event.key !== "Escape" || event.defaultPrevented) return;
        if (this.#shortcutHelp && !this.#shortcutHelp.hidden) {
          event.preventDefault();
          event.stopPropagation();
          this.#setShortcutHelpOpen(false);
          this.#shortcutButton.focus();
        } else this.close();
      });
      this.#element = panel;
      this.#attachToCluster();
      this.#syncNoticeChrome();
      if (shortcutFooter2) this.setShortcutFooter(shortcutFooter2);
      this.#layoutListener = () => this.#scheduleLayout();
      document.defaultView.addEventListener("flt:launcher-moved", this.#layoutListener);
      document.defaultView.addEventListener("resize", this.#layoutListener);
    }
    get element() {
      return this.#element;
    }
    get activeView() {
      return this.#activeView;
    }
    setShortcutFooter(content) {
      if (!this.#shortcutFooter) {
        const document = this.#document;
        const id = `flt-${this.#element.dataset.fltProduct}-shortcut-help`;
        this.#shortcutButton = document.createElement("button");
        this.#shortcutButton.className = "flt-icon-button flt-header-help";
        this.#shortcutButton.type = "button";
        const book = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        book.setAttribute("viewBox", "0 0 24 24");
        book.setAttribute("width", "18");
        book.setAttribute("height", "18");
        book.setAttribute("fill", "none");
        book.setAttribute("stroke", "currentColor");
        book.setAttribute("stroke-width", "1.75");
        book.setAttribute("stroke-linecap", "round");
        book.setAttribute("stroke-linejoin", "round");
        book.setAttribute("aria-hidden", "true");
        book.setAttribute("focusable", "false");
        const pages = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pages.setAttribute(
          "d",
          "M12 5.5C9 3.5 5.5 3.5 2 4.5v15c3.5-1 7-1 10 1 3-2 6.5-2 10-1v-15c-3.5-1-7-1-10 1Zm0 0v15"
        );
        book.append(pages);
        this.#shortcutButton.append(book);
        this.#shortcutButton.title = "Keyboard shortcuts";
        this.#shortcutButton.setAttribute("aria-label", "Keyboard shortcuts");
        this.#shortcutButton.setAttribute("aria-controls", id);
        this.#shortcutButton.setAttribute("aria-expanded", "false");
        this.#shortcutButton.addEventListener(
          "click",
          () => this.#setShortcutHelpOpen(this.#shortcutHelp.hidden)
        );
        const head = this.#element.querySelector(".flt-menu-head");
        head.classList.add("flt-menu-head-with-help");
        head.insertBefore(this.#shortcutButton, head.querySelector(".flt-header-close"));
        this.#shortcutHelp = document.createElement("section");
        this.#shortcutHelp.className = "flt-shortcut-help";
        this.#shortcutHelp.id = id;
        this.#shortcutHelp.hidden = true;
        this.#shortcutHelp.setAttribute("aria-labelledby", `${id}-title`);
        const heading2 = document.createElement("h3");
        heading2.id = `${id}-title`;
        heading2.textContent = "Keyboard shortcuts";
        heading2.classList.add("flt-help-anchor");
        heading2.dataset.fltTip = "FL Tools keys work outside text fields and interactive controls. Alt+Shift is used only for conflicts. FetLife shortcuts stay unchanged.";
        heading2.setAttribute("aria-description", heading2.dataset.fltTip);
        heading2.tabIndex = 0;
        const productShortcuts = document.createElement("details");
        productShortcuts.className = "flt-shortcut-disclosure";
        const productSummary = document.createElement("summary");
        productSummary.textContent = "FL Tools shortcuts";
        this.#shortcutFooter = document.createElement("div");
        productShortcuts.append(productSummary, this.#shortcutFooter);
        const nativeHelp = nativeShortcutHelp(document);
        nativeHelp.addEventListener("toggle", () => this.#scheduleLayout());
        productShortcuts.addEventListener("toggle", () => this.#scheduleLayout());
        this.#shortcutHelp.append(heading2, productShortcuts, nativeHelp);
        this.#shortcutHelp.append(terminologyHelp(document, () => this.#scheduleLayout()));
        this.#element.querySelector(".flt-panel-body").prepend(this.#shortcutHelp);
      }
      this.#shortcutFooter.replaceChildren(content);
      this.#scheduleLayout();
    }
    #setShortcutHelpOpen(open) {
      if (!this.#shortcutHelp) return;
      this.#shortcutHelp.hidden = !open;
      this.#shortcutButton.setAttribute("aria-expanded", String(open));
      this.#scheduleLayout();
    }
    setTopContent(content, { panel = this.#element } = {}) {
      if (!this.#topContent) {
        this.#topContent = this.#document.createElement("div");
        this.#topContent.className = "flt-top-content";
        panel.insertBefore(this.#topContent, panel.querySelector(".flt-panel-body"));
      }
      this.#topContent.replaceChildren(content);
      if (this.#element) this.#scheduleLayout();
    }
    getView(id) {
      return this.#views.get(this.#resolveViewId(id));
    }
    replaceViewContent(id, content) {
      const resolvedId = this.#resolveViewId(id);
      const view = this.#views.get(resolvedId);
      if (!view) throw new ContractError("Unknown shell destination", { id });
      const productContent = [...view.querySelectorAll("[data-flt-product-view-content]")].find(
        (candidate) => candidate.dataset.fltProductViewContent === resolvedId
      );
      if (productContent) {
        productContent.replaceChildren();
        if (content) productContent.append(content);
        this.#scheduleLayout();
        return;
      }
      view.replaceChildren();
      if (content) view.append(content);
      if (this.#support.has(resolvedId)) view.append(this.#support.get(resolvedId));
      this.#scheduleLayout();
    }
    showChangelog({ version } = {}) {
      const release = this.#getChangelog?.() ?? null;
      const details = Array.isArray(release?.summary) ? release.summary : [];
      this.showUpdateNotice({
        details,
        kicker: "Current Version",
        placement: "menu",
        releaseUrl: this.#releaseUrl,
        text: `What's new in v${version ?? this.#version ?? release?.version ?? ""}.`,
        title: `${this.#productName} Changelog`,
        version: version ?? this.#version ?? release?.version
      });
    }
    showUpdateNotice({
      actionLabel = "Install Update",
      actionUrl = "",
      details = [],
      kicker = "What's New",
      onAction,
      placement = "dock",
      releaseUrl = this.#releaseUrl,
      text: text2 = "",
      title,
      version = ""
    }) {
      if (!title) throw new ContractError("Update notice title is required");
      const noticePlacement = placement === "menu" ? "menu" : "progress";
      this.#placeUpdateNotice(noticePlacement);
      const notice = this.#notice;
      this.#syncNoticeChrome();
      notice.querySelector(".flt-update-kicker").textContent = kicker;
      notice.querySelector(".flt-update-title").textContent = title;
      notice.querySelector(".flt-update-version").textContent = version ? `v${version}` : "";
      notice.querySelector(".flt-update-text").textContent = text2;
      const list = notice.querySelector(".flt-update-list");
      list.replaceChildren();
      for (const detail of details.slice(0, 4)) {
        const item = this.#document.createElement("li");
        item.textContent = String(detail);
        list.append(item);
      }
      list.hidden = list.childElementCount === 0;
      const release = notice.querySelector(".flt-update-release");
      release.hidden = !releaseUrl;
      release.onclick = releaseUrl ? () => this.#document.defaultView.open(releaseUrl, "_blank", "noopener") : null;
      const action = notice.querySelector(".flt-update-action");
      const hasAction = typeof onAction === "function";
      action.hidden = !hasAction;
      action.textContent = actionLabel;
      if (hasAction && actionUrl) {
        action.href = actionUrl;
        action.target = "_blank";
        action.rel = "noopener noreferrer";
      } else {
        action.removeAttribute("href");
        action.removeAttribute("target");
        action.removeAttribute("rel");
      }
      action.onclick = hasAction ? (event) => {
        if (!actionUrl) event.preventDefault();
        onAction(event);
      } : null;
      notice.hidden = false;
      this.#document.defaultView.clearTimeout(this.#noticeTimer);
      this.#noticeTimer = this.#document.defaultView.setTimeout(() => {
        if (!notice.hidden) this.hideUpdateNotice();
      }, CHROME_CONTRACT.notices.durationMs);
      this.#scheduleLayout();
    }
    hideUpdateNotice() {
      this.#document.defaultView.clearTimeout(this.#noticeTimer);
      this.#noticeTimer = void 0;
      this.#notice.hidden = true;
      this.#scheduleLayout();
    }
    setChrome({ contrast, menuWidth, themeSkin } = {}) {
      if (contrast !== void 0) {
        this.#element.dataset.fltContrast = contrast ? "true" : "false";
      }
      if (menuWidth !== void 0) {
        const width = applyMenuWidth(this.#document, menuWidth);
        if (width === "full") delete this.#element.dataset.fltMenuWidth;
        else this.#element.dataset.fltMenuWidth = width;
      }
      if (themeSkin !== void 0) {
        if (themeSkin === "pride") this.#element.dataset.fltThemeSkin = "pride";
        else delete this.#element.dataset.fltThemeSkin;
      }
      this.#syncClusterChrome();
      this.#syncNoticeChrome();
    }
    setHeaderItems(items) {
      if (!Array.isArray(items) || items.length < 1 || items.length > 3) {
        throw new ContractError("Shell header requires one to three meaningful items");
      }
      this.#headerItems.replaceChildren();
      const node = this.#document.createElement("span");
      node.className = "flt-header-item";
      node.textContent = items.map(String).join(" \xB7 ");
      this.#headerItems.append(node);
    }
    setView(id, { focus = false } = {}) {
      const resolvedId = this.#resolveViewId(id);
      if (!this.#views.has(resolvedId)) throw new ContractError("Unknown shell destination", { id });
      this.#activeView = resolvedId;
      for (const [viewId, view] of this.#views) {
        const active = viewId === resolvedId;
        view.classList.toggle("flt-tool-hidden", !active);
        const button = this.#navButtons.get(viewId);
        button.setAttribute("aria-expanded", String(active));
        button.querySelector(".flt-tool-chevron").textContent = active ? "\u25BE" : "\u25B8";
      }
      const activeButton = this.#navButtons.get(resolvedId);
      this.#markLastOpened(resolvedId);
      if (typeof activeButton.scrollIntoView === "function") {
        activeButton.scrollIntoView({ block: "nearest" });
      }
      if (focus) activeButton.focus();
      this.#scheduleLayout();
    }
    ensureMounted() {
      if (!this.#element || !this.#document.body) return;
      if (this.#cluster?.isConnected && this.#element.parentElement === this.#cluster && this.#notice.isConnected) {
        return;
      }
      this.#attachToCluster();
    }
    open({ trigger } = {}) {
      this.ensureMounted();
      this.#returnFocus = trigger ?? this.#document.activeElement;
      this.#element.hidden = false;
      this.#navButtons.get(this.#activeView)?.focus();
      this.#scheduleLayout();
    }
    toggle({ trigger } = {}) {
      if (this.#element.hidden) this.open({ trigger });
      else this.close();
    }
    close() {
      if (this.#element.hidden) return;
      this.#setShortcutHelpOpen(false);
      if (this.#noticePlacement() === "menu") this.hideUpdateNotice();
      this.#element.hidden = true;
      if (this.#returnFocus?.isConnected && typeof this.#returnFocus.focus === "function") {
        this.#returnFocus.focus();
      }
      this.#returnFocus = void 0;
      this.#scheduleLayout();
    }
    destroy() {
      this.#document.defaultView.removeEventListener("flt:launcher-moved", this.#layoutListener);
      this.#document.defaultView.removeEventListener("resize", this.#layoutListener);
      this.#document.defaultView.clearTimeout(this.#noticeTimer);
      if (this.#layoutFrame) {
        const view = this.#document.defaultView;
        if (typeof view.cancelAnimationFrame === "function")
          view.cancelAnimationFrame(this.#layoutFrame);
        else view.clearTimeout(this.#layoutFrame);
      }
      this.#notice.remove();
      this.#element.remove();
      if (this.#cluster && !this.#cluster.querySelector(".flt-panel") && !this.#cluster.querySelector(".flt-launcher")) {
        this.#cluster.remove();
      }
      this.#views.clear();
      this.#navButtons.clear();
      this.#sections.clear();
      this.#navigationAliases.clear();
    }
    #buildNotice() {
      const notice = this.#document.createElement("div");
      notice.className = "flt-root flt-update-notice";
      notice.hidden = true;
      const dismiss = this.#document.createElement("button");
      dismiss.className = "flt-update-dismiss";
      dismiss.type = "button";
      dismiss.setAttribute("aria-label", "Dismiss Update Notice");
      dismiss.textContent = "\xD7";
      dismiss.addEventListener("click", () => this.hideUpdateNotice());
      const head = this.#document.createElement("div");
      head.className = "flt-update-head";
      const heading2 = this.#document.createElement("div");
      heading2.className = "flt-update-heading";
      const kicker = this.#document.createElement("div");
      kicker.className = "flt-update-kicker";
      const title = this.#document.createElement("div");
      title.className = "flt-update-title";
      heading2.append(kicker, title);
      const version = this.#document.createElement("div");
      version.className = "flt-update-version";
      head.append(heading2, version);
      const message = this.#document.createElement("div");
      message.className = "flt-update-text";
      const list = this.#document.createElement("ul");
      list.className = "flt-update-list";
      const actions = this.#document.createElement("div");
      actions.className = "flt-update-actions";
      const release = this.#document.createElement("button");
      release.className = "flt-update-release";
      release.type = "button";
      release.textContent = "GitHub Release";
      const action = this.#document.createElement("a");
      action.className = "flt-update-action";
      action.hidden = true;
      actions.append(release, action);
      notice.append(dismiss, head, message, list, actions);
      return notice;
    }
    #toggleView(id) {
      const view = this.#views.get(id);
      if (!view) throw new ContractError("Unknown shell destination", { id });
      if (!view.classList.contains("flt-tool-hidden")) {
        view.classList.add("flt-tool-hidden");
        const button = this.#navButtons.get(id);
        button.setAttribute("aria-expanded", "false");
        button.querySelector(".flt-tool-chevron").textContent = "\u25B8";
        this.#markLastOpened(id);
        this.#scheduleLayout();
        return;
      }
      this.setView(id);
    }
    #markLastOpened(id) {
      for (const [viewId, button] of this.#navButtons) {
        button.classList.toggle("last-opened", viewId === id);
      }
    }
    #navigateAccordions(event, currentId) {
      const ids = [...this.#views.keys()].filter((id) => !this.#sections.get(id)?.hidden);
      const index = ids.indexOf(currentId);
      let next;
      if (event.key === "ArrowDown") next = ids[(index + 1) % ids.length];
      if (event.key === "ArrowUp") next = ids[(index - 1 + ids.length) % ids.length];
      if (event.key === "Home") next = ids[0];
      if (event.key === "End") next = ids.at(-1);
      if (!next) return;
      event.preventDefault();
      this.#navButtons.get(next).focus();
    }
    #resolveViewId(id) {
      return this.#navigationAliases.get(id) ?? id;
    }
    #noticePlacement() {
      return this.#notice.dataset.fltPlacement === "menu" ? "menu" : "dock";
    }
    #progressStack() {
      return this.#cluster?.querySelector(".flt-progress-stack") ?? null;
    }
    #attachToCluster() {
      const { cluster, progressStack } = ensureUpdateCluster(this.#document);
      this.#cluster = cluster;
      if (this.#element.parentElement !== cluster) {
        cluster.insertBefore(this.#element, progressStack);
      }
      if (!cluster.isConnected) this.#document.body.append(cluster);
      this.#syncClusterChrome();
      this.#placeUpdateNotice(this.#noticePlacement() === "menu" ? "menu" : "progress");
    }
    #syncClusterChrome() {
      if (!this.#cluster) return;
      const width = this.#element.dataset.fltMenuWidth || "full";
      this.#cluster.dataset.fltMenuWidth = width;
      if (this.#element.dataset.fltThemeSkin) {
        this.#cluster.dataset.fltThemeSkin = this.#element.dataset.fltThemeSkin;
      } else {
        delete this.#cluster.dataset.fltThemeSkin;
      }
    }
    #placeUpdateNotice(placement = "progress") {
      const notice = this.#notice;
      const progressStack = this.#progressStack();
      if (!notice || !progressStack) return;
      notice.dataset.fltPlacement = placement === "menu" ? "menu" : "dock";
      this.#syncClusterChrome();
      if (notice.dataset.fltPlacement === "dock") {
        if (notice.parentElement !== progressStack || progressStack.firstElementChild !== notice) {
          progressStack.prepend(notice);
        }
      } else if (notice.parentElement !== this.#cluster) {
        this.#cluster.appendChild(notice);
      }
    }
    #positionMenuUpdateNotice(openUp) {
      const notice = this.#notice;
      const progressStack = this.#progressStack();
      if (!notice || !progressStack || notice.hidden || notice.dataset.fltPlacement !== "menu" || notice.parentElement !== this.#cluster) {
        return;
      }
      if (openUp) {
        if (notice.nextElementSibling !== this.#element) {
          this.#cluster.insertBefore(notice, this.#element);
        }
      } else if (notice.nextElementSibling !== progressStack) {
        this.#cluster.insertBefore(notice, progressStack);
      }
    }
    #syncNoticeChrome() {
      this.#notice.dataset.fltProduct = this.#element.dataset.fltProduct;
      if (this.#element.dataset.fltThemeSkin) {
        this.#notice.dataset.fltThemeSkin = this.#element.dataset.fltThemeSkin;
      } else {
        delete this.#notice.dataset.fltThemeSkin;
      }
      if (this.#element.dataset.fltMenuWidth) {
        this.#notice.dataset.fltMenuWidth = this.#element.dataset.fltMenuWidth;
      } else {
        delete this.#notice.dataset.fltMenuWidth;
      }
    }
    #launcherOrigin() {
      try {
        const saved = JSON.parse(
          this.#document.defaultView.localStorage.getItem("flt-launcher-position")
        );
        if (Number.isFinite(saved?.x) && Number.isFinite(saved?.y)) return saved;
      } catch {
      }
      return null;
    }
    #scheduleLayout() {
      const hasLauncher = Boolean(this.#cluster?.querySelector(".flt-launcher"));
      if (this.#element.hidden && this.#notice.hidden && !hasLauncher || this.#layoutFrame) return;
      const view = this.#document.defaultView;
      const schedule = typeof view.requestAnimationFrame === "function" ? view.requestAnimationFrame.bind(view) : (callback) => view.setTimeout(callback, 0);
      this.#layoutFrame = schedule(() => {
        this.#layoutFrame = void 0;
        this.#layoutChrome();
      });
    }
    #layoutChrome() {
      const cluster = this.#cluster;
      const dock = this.#element;
      const progressStack = this.#progressStack();
      const view = this.#document.defaultView;
      if (!cluster || !progressStack) return;
      const otherOpen = [...cluster.querySelectorAll(".flt-panel")].some(
        (panel) => panel !== dock && !panel.hidden
      );
      if (dock.hidden && otherOpen) return;
      const badgeRow = cluster.querySelector(".flt-launcher");
      const badge = launcherSize(badgeRow ?? progressStack);
      const rowHeight = Math.max(badge.height, progressStack.offsetHeight || 0, 48);
      const railOpen = !dock.hidden;
      const notice = this.#notice;
      const menuNoticeVisible = Boolean(
        notice && !notice.hidden && notice.dataset.fltPlacement === "menu"
      );
      const noticeHeight = menuNoticeVisible ? notice.offsetHeight || notice.scrollHeight || 0 : 0;
      const noticeGap = menuNoticeVisible && noticeHeight ? CHROME_CONTRACT.notices.gapPx : 0;
      const chrome = rowHeight + noticeHeight + noticeGap + 32;
      dock.style.maxHeight = railOpen ? `${Math.max(160, view.innerHeight - chrome)}px` : "";
      dock.style.overflowY = railOpen ? "auto" : "";
      const measuredMenu = railOpen ? dock.offsetHeight || dock.clientHeight || 0 : 0;
      if (railOpen && measuredMenu === 0 && !this.#zeroHeightRetry) {
        this.#zeroHeightRetry = true;
        this.#scheduleLayout();
      } else {
        this.#zeroHeightRetry = false;
      }
      const menuHeight = measuredMenu;
      const gap = railOpen ? 8 : 0;
      const menuBlockHeight = menuHeight + noticeHeight + noticeGap;
      const saved = this.#launcherOrigin();
      const clusterTop = saved ? saved.y : view.innerHeight - rowHeight - 12;
      if (!saved) {
        const origin = clusterTop;
        const anchor = origin <= (view.innerHeight - rowHeight) / 2 ? "top" : "bottom";
        cluster.dataset.fltLauncherAnchor = anchor;
      }
      const spaceBelow = view.innerHeight - clusterTop - rowHeight - 8;
      const spaceAbove = clusterTop - 8;
      const openUp = railOpen && menuHeight > 0 && spaceBelow < menuBlockHeight + 12 && spaceAbove >= spaceBelow;
      cluster.classList.toggle("open-up", openUp);
      cluster.style.zIndex = railOpen ? "2147483647" : "2147483600";
      this.#positionMenuUpdateNotice(openUp);
      const clusterHeight = rowHeight + gap + (railOpen ? menuHeight : 0) + noticeHeight + noticeGap;
      let top = openUp ? clusterTop - menuHeight - gap - noticeHeight - noticeGap : clusterTop;
      top = Math.max(
        VIEWPORT_EDGE2,
        Math.min(view.innerHeight - Math.max(clusterHeight, rowHeight) - VIEWPORT_EDGE2, top)
      );
      cluster.style.top = `${top}px`;
      cluster.style.bottom = "auto";
      const leftDock = dockIsLeft(this.#document);
      const menuWidth = railOpen ? dock.offsetWidth || dock.clientWidth || 0 : 0;
      const noticeWidth = menuNoticeVisible ? notice.offsetWidth || notice.clientWidth || 0 : 0;
      const progressWidth = progressStack.offsetWidth || progressStack.clientWidth || 0;
      const clusterWidth = Math.max(badge.width, menuWidth, noticeWidth, progressWidth);
      const maximumInset = Math.max(VIEWPORT_EDGE2, view.innerWidth - clusterWidth - VIEWPORT_EDGE2);
      const clampInset = (value) => Math.max(VIEWPORT_EDGE2, Math.min(maximumInset, value));
      if (saved) {
        if (leftDock) {
          cluster.style.left = `${clampInset(saved.x)}px`;
          cluster.style.right = "auto";
        } else {
          cluster.style.left = "auto";
          cluster.style.right = `${clampInset(view.innerWidth - (saved.x + badge.width))}px`;
        }
      } else if (leftDock) {
        cluster.style.left = `${clampInset(12)}px`;
        cluster.style.right = "auto";
      } else {
        cluster.style.right = `${clampInset(12)}px`;
        cluster.style.removeProperty("left");
      }
    }
  };

  // ../fl-tools-core/src/ui/update-lifecycle.js
  var UPDATE_CHECK_INTERVAL_MS = CHROME_CONTRACT.updates.intervalMs;
  var UPDATE_CHECK_LEASE_MS = 3e4;
  var UPDATE_RETURN_DELAY_MS = 3e3;
  var UPDATE_RELOAD_FALLBACK_MS = 45e3;
  var UPDATE_RELOAD_PENDING_TTL_MS = 2 * 60 * 1e3;
  function withQuery(url, params) {
    const separator = url.includes("?") ? "&" : "?";
    const query = Object.entries(params).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join("&");
    return `${url}${separator}${query}`;
  }
  function cacheBustedInstallUrl(installUrl, version) {
    return withQuery(installUrl, { v: version });
  }
  var UpdateLifecycle = class {
    #announcedVersion = "";
    #changelog;
    #checkTimer;
    #destroyed = false;
    #document;
    #fallbackTimer;
    #installUrl;
    #launcher;
    #listeners;
    #productId;
    #productName;
    #reloadTimer;
    #releaseUrl;
    #shell;
    #updateUrl;
    #version;
    #view;
    constructor({
      document,
      launcher,
      shell,
      productId: productId2,
      productName,
      version,
      changelog,
      releaseUrl = "",
      installUrl = "",
      updateUrl = ""
    }) {
      this.#document = document;
      this.#launcher = launcher;
      this.#shell = shell;
      this.#productId = productId2;
      this.#productName = productName;
      this.#version = version;
      this.#changelog = changelog;
      this.#releaseUrl = releaseUrl;
      this.#installUrl = installUrl;
      this.#updateUrl = updateUrl || installUrl;
      this.#view = document.defaultView;
    }
    start() {
      this.#bindReloadWatchers();
      this.#checkVersionNotice();
      if (this.#updateUrl) {
        void this.#scheduleUpdateCheck();
        this.#checkTimer = this.#view.setInterval(() => {
          if (!this.#destroyed) void this.#scheduleUpdateCheck();
        }, UPDATE_CHECK_INTERVAL_MS);
      }
      this.#resumeReloadPending();
    }
    destroy() {
      this.#destroyed = true;
      this.#view.clearTimeout(this.#reloadTimer);
      this.#view.clearTimeout(this.#fallbackTimer);
      this.#view.clearInterval(this.#checkTimer);
      this.#listeners?.abort();
      this.#launcher.setUpdateAvailable(this.#productId, null);
    }
    #bindReloadWatchers() {
      const abort = new this.#view.AbortController();
      this.#listeners = abort;
      const options = { signal: abort.signal };
      this.#view.addEventListener("blur", () => this.#markInstallerLeft("blur"), options);
      this.#view.addEventListener("focus", () => this.#handleInstallerReturn("focus"), options);
      this.#document.addEventListener(
        "visibilitychange",
        () => {
          if (this.#document.visibilityState === "hidden") this.#markInstallerLeft("hidden");
          else this.#handleInstallerReturn("visible");
        },
        options
      );
      this.#view.addEventListener("pagehide", () => this.#markInstallerLeft("pagehide"), options);
    }
    #changelogDetails() {
      const release = typeof this.#changelog === "function" ? this.#changelog() : this.#changelog;
      return Array.isArray(release?.summary) ? release.summary.slice(0, 4) : [];
    }
    #checkVersionNotice() {
      const state = this.#loadUpdateState();
      if (state.availableVersion && compareScriptVersions(state.availableVersion, this.#version) <= 0) {
        state.availableVersion = "";
        state.availableAt = 0;
        this.#saveUpdateState(state);
      }
      this.#clearAvailableIndicator();
      const previous = this.#read(this.#lastVersionKey());
      if (previous && previous !== this.#version) {
        this.#shell.showUpdateNotice({
          details: this.#changelogDetails(),
          kicker: "Update Complete",
          placement: "dock",
          releaseUrl: this.#releaseUrl,
          text: `Updated from v${previous} to v${this.#version}.`,
          title: `${this.#productName} Updated`,
          version: this.#version
        });
      }
      this.#write(this.#lastVersionKey(), this.#version);
      this.#checkCachedUpdateNotice();
    }
    #checkCachedUpdateNotice() {
      const state = this.#loadUpdateState();
      const available = String(state.availableVersion || "");
      if (available && compareScriptVersions(available, this.#version) > 0) {
        this.#markUpdateAvailable(available);
        return true;
      }
      if (available && compareScriptVersions(available, this.#version) <= 0) {
        state.availableVersion = "";
        state.availableAt = 0;
        this.#saveUpdateState(state);
      }
      this.#clearAvailableIndicator();
      return false;
    }
    async #scheduleUpdateCheck(force = false) {
      const now = Date.now();
      const state = this.#loadUpdateState();
      if (state.availableVersion && compareScriptVersions(state.availableVersion, this.#version) <= 0) {
        state.availableVersion = "";
        state.availableAt = 0;
      }
      if (state.lastRemoteVersion && compareScriptVersions(state.lastRemoteVersion, this.#version) <= 0) {
        state.availableVersion = "";
        state.availableAt = 0;
      }
      state.checkedForVersion = this.#version;
      this.#saveUpdateState(state);
      if (!force && Number(state.checkLeaseUntil || 0) > now) {
        this.#checkCachedUpdateNotice();
        return;
      }
      if (!force && state.checkedForVersion === this.#version && now - Number(state.lastCheckAt || 0) < UPDATE_CHECK_INTERVAL_MS && state.lastCheckAt) {
        this.#checkCachedUpdateNotice();
        return;
      }
      state.lastCheckAt = now;
      state.checkLeaseUntil = now + UPDATE_CHECK_LEASE_MS;
      state.lastError = "";
      this.#saveUpdateState(state);
      const cacheBucket = Math.floor(now / UPDATE_CHECK_INTERVAL_MS);
      const checkUrl = withQuery(this.#updateUrl, {
        flt_check: this.#version,
        t: String(cacheBucket)
      });
      try {
        const remote = await this.#requestText(checkUrl);
        if (this.#destroyed) return;
        const nextState = this.#loadUpdateState();
        const remoteVersion = parseUserscriptVersion(remote.text);
        nextState.checkedForVersion = this.#version;
        nextState.lastCheckAt = Date.now();
        nextState.lastHttpStatus = remote.status;
        nextState.lastRemoteVersion = remoteVersion;
        nextState.checkLeaseUntil = 0;
        nextState.lastError = "";
        if (remoteVersion && compareScriptVersions(remoteVersion, this.#version) > 0) {
          nextState.availableVersion = remoteVersion;
          nextState.availableAt = Date.now();
          this.#saveUpdateState(nextState);
          this.#markUpdateAvailable(remoteVersion);
          return;
        }
        if (remoteVersion && compareScriptVersions(remoteVersion, this.#version) <= 0) {
          nextState.availableVersion = "";
          nextState.availableAt = 0;
          this.#clearAvailableIndicator();
        }
        this.#saveUpdateState(nextState);
      } catch (error) {
        if (this.#destroyed) return;
        const nextState = this.#loadUpdateState();
        nextState.lastError = error instanceof Error ? error.message : "Update check failed";
        nextState.checkLeaseUntil = 0;
        nextState.lastCheckAt = Date.now();
        this.#saveUpdateState(nextState);
      }
    }
    #markUpdateAvailable(version) {
      if (!version || compareScriptVersions(version, this.#version) <= 0) return;
      const alreadyAnnounced = this.#announcedVersion === version;
      this.#launcher.setUpdateAvailable(this.#productId, version);
      if (alreadyAnnounced) return;
      this.#announcedVersion = version;
      this.#shell.showUpdateNotice({
        actionLabel: "Install Update",
        actionUrl: cacheBustedInstallUrl(this.#installUrl || this.#updateUrl, this.#version),
        details: [
          `A newer ${this.#productName} build is available.`,
          "Install the latest userscript to get the newest fixes and improvements.",
          "After reinstalling, return to FetLife and FL Tools will refresh this page automatically."
        ],
        kicker: "Update Available",
        onAction: () => this.#beginUpdateInstall(version),
        placement: "dock",
        releaseUrl: this.#releaseUrl,
        text: `v${version} is ready to install.`,
        title: `New ${this.#productName} Version Available`,
        version
      });
    }
    #clearAvailableIndicator() {
      this.#announcedVersion = "";
      this.#launcher.setUpdateAvailable(this.#productId, null);
    }
    #beginUpdateInstall(targetVersion) {
      if (!targetVersion || compareScriptVersions(targetVersion, this.#version) <= 0) return false;
      const now = Date.now();
      this.#view.clearTimeout(this.#reloadTimer);
      this.#view.clearTimeout(this.#fallbackTimer);
      this.#write(
        this.#reloadKey(),
        JSON.stringify({
          expiresAt: now + UPDATE_RELOAD_PENDING_TTL_MS,
          fallbackAt: now + UPDATE_RELOAD_FALLBACK_MS,
          sourceVersion: this.#version,
          startedAt: now,
          targetVersion
        })
      );
      this.#scheduleReloadFallback();
      return true;
    }
    #resumeReloadPending() {
      if (!this.#validReloadState()) return;
      this.#scheduleReloadFallback();
      this.#enforceReloadPending(Date.now());
    }
    #validReloadState(now = Date.now()) {
      const state = this.#readJson(this.#reloadKey());
      if (!state?.startedAt || !state?.targetVersion) return null;
      if (Number(state.expiresAt || 0) <= now) {
        this.#clearReloadState();
        return null;
      }
      if (compareScriptVersions(this.#version, state.targetVersion) >= 0) {
        this.#clearReloadState();
        return null;
      }
      return state;
    }
    #clearReloadState() {
      this.#view.clearTimeout(this.#reloadTimer);
      this.#view.clearTimeout(this.#fallbackTimer);
      try {
        this.#view.localStorage.removeItem(this.#reloadKey());
      } catch {
      }
    }
    #scheduleReload(delayMs = UPDATE_RETURN_DELAY_MS) {
      const state = this.#validReloadState();
      if (!state) return false;
      const reloadAt = Date.now() + Math.max(0, delayMs);
      if (Number(state.reloadAt || 0) && Number(state.reloadAt) <= reloadAt) return true;
      state.reloadAt = reloadAt;
      this.#write(this.#reloadKey(), JSON.stringify(state));
      this.#view.clearTimeout(this.#reloadTimer);
      this.#reloadTimer = this.#view.setTimeout(
        () => {
          if (!this.#validReloadState()) return;
          this.#clearReloadState();
          this.#view.location.reload();
        },
        Math.max(0, reloadAt - Date.now())
      );
      return true;
    }
    #scheduleReloadFallback() {
      const state = this.#validReloadState();
      if (!state) return;
      this.#view.clearTimeout(this.#fallbackTimer);
      const delay = Math.max(0, Number(state.fallbackAt || 0) - Date.now());
      this.#fallbackTimer = this.#view.setTimeout(
        () => this.#enforceReloadPending(Date.now()),
        delay + 20
      );
    }
    #enforceReloadPending(now = Date.now()) {
      const state = this.#validReloadState(now);
      if (!state) return false;
      if (Number(state.reloadAt || 0) && Number(state.reloadAt) <= now) {
        this.#clearReloadState();
        this.#view.location.reload();
        return true;
      }
      if (this.#document.visibilityState === "visible") {
        return this.#scheduleReload(UPDATE_RETURN_DELAY_MS);
      }
      return false;
    }
    #markInstallerLeft(reason) {
      const state = this.#validReloadState();
      if (!state || state.leftAt) return false;
      state.leftAt = Date.now();
      state.leftReason = reason;
      this.#write(this.#reloadKey(), JSON.stringify(state));
      return true;
    }
    #handleInstallerReturn() {
      const state = this.#validReloadState();
      if (!state) return false;
      if (state.leftAt) return this.#scheduleReload(UPDATE_RETURN_DELAY_MS);
      return this.#enforceReloadPending(Date.now());
    }
    async #requestText(url) {
      const gm = this.#view.GM?.xmlHttpRequest ?? this.#view.GM_xmlhttpRequest;
      if (typeof gm === "function") {
        return new this.#view.Promise((resolve2, reject) => {
          gm({
            headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
            method: "GET",
            onerror: (response) => reject(
              new Error(
                `Update check network error${response?.status ? ` (${response.status})` : ""}`
              )
            ),
            onload: (response) => resolve2({
              status: Number(response.status || 0),
              text: String(response.responseText || "")
            }),
            ontimeout: () => reject(new Error("Update check timed out")),
            timeout: 12e3,
            url
          });
        });
      }
      const controller = new this.#view.AbortController();
      const timer = this.#view.setTimeout(() => controller.abort(), 12e3);
      try {
        const response = await this.#view.fetch(url, {
          cache: "no-cache",
          headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
          signal: controller.signal
        });
        return {
          status: Number(response.status || 0),
          text: await response.text()
        };
      } finally {
        this.#view.clearTimeout(timer);
      }
    }
    #loadUpdateState() {
      const parsed = this.#readJson(this.#updateStateKey());
      return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
    }
    #saveUpdateState(state) {
      this.#write(this.#updateStateKey(), JSON.stringify(state || {}));
    }
    #readJson(key) {
      try {
        return JSON.parse(this.#view.localStorage.getItem(key) || "null");
      } catch {
        return null;
      }
    }
    #read(key) {
      try {
        return this.#view.localStorage.getItem(key) || "";
      } catch {
        return "";
      }
    }
    #write(key, value) {
      try {
        this.#view.localStorage.setItem(key, value);
      } catch {
      }
    }
    #lastVersionKey() {
      return `flt:${this.#productId}:last-version`;
    }
    #updateStateKey() {
      return `flt:${this.#productId}:update-state`;
    }
    #reloadKey() {
      return `flt:${this.#productId}:update-reload`;
    }
  };

  // ../fl-tools-core/src/ui/core-ui.js
  var CoreUI = class {
    #document;
    #shells = /* @__PURE__ */ new Set();
    #started = false;
    #survivalAbort;
    #survivalObserver;
    #version;
    #diagnostics;
    #health;
    #updates;
    #notificationCenter;
    #help;
    #onDocumentPointerDown = (event) => {
      const target = event.target;
      if (!target || [...this.#shells].some((shell) => shell.element.contains(target))) return;
      if (target.closest?.(".flt-launcher, .flt-dialog, .flt-update-notice")) return;
      for (const shell of this.#shells) shell.close();
    };
    constructor({ document, idFactory, version, diagnostics, health, notifications, updates }) {
      if (!document?.createElement || !version)
        throw new ContractError("Core UI dependencies are required");
      this.#document = document;
      this.#version = version;
      this.controls = new ControlFactory({ document, idFactory });
      this.dialogs = new DialogManager({ controls: this.controls, document, idFactory });
      this.launcher = new LauncherManager({ document });
      this.presentation = new PresentationPolicy({ document });
      this.announcer = new AccessibleAnnouncer({ document });
      this.theme = new ThemeEngine({ document });
      this.#help = new HelpTooltips(document);
      this.#diagnostics = diagnostics;
      this.#health = health;
      this.preferences = new SharedPreferences({
        document,
        controls: this.controls,
        apply: (value) => {
          for (const shell of this.#shells) shell.setChrome(value);
          this.notifications?.setEnabled(value.notifications);
        }
      });
      this.#updates = updates;
      this.#notificationCenter = notifications;
      this.notifications = notifications ? new NotificationSurface({
        announcer: this.announcer,
        controls: this.controls,
        document,
        notifications
      }) : null;
    }
    start() {
      if (this.#started) return;
      this.theme.mount();
      this.#help.start();
      this.announcer.mount();
      this.notifications?.mount();
      this.preferences.apply();
      this.#watchSurvival();
      this.#started = true;
    }
    restoreChrome() {
      if (!this.#started) return;
      this.theme.mount();
      this.announcer.mount();
      this.#help.ensureMounted();
      for (const shell of this.#shells) shell.ensureMounted();
    }
    #watchSurvival() {
      const document = this.#document;
      const view = document.defaultView;
      const restore = () => this.restoreChrome();
      const Observer = view?.MutationObserver;
      if (Observer) {
        this.#survivalObserver = new Observer(restore);
        this.#survivalObserver.observe(document, { childList: true, subtree: true });
      }
      if (!view?.addEventListener) return;
      this.#survivalAbort = new view.AbortController();
      const options = { signal: this.#survivalAbort.signal };
      document.addEventListener("pointerdown", this.#onDocumentPointerDown, options);
      for (const type of PAGE_NAVIGATION_EVENTS) {
        view.addEventListener(type, restore, options);
        document.addEventListener(type, restore, options);
      }
    }
    createShell(options) {
      if (!this.#started) throw new ContractError("Core UI is not started");
      const footer = {
        getChangelog: () => options.changelog ?? this.#updates?.whatsNew(options.productId) ?? null,
        releaseUrl: options.releaseUrl ?? "",
        ...options.footer ?? {}
      };
      const version = options.version ?? this.#version;
      const preferences = this.preferences.mount();
      const supplied = options.navigation.map((entry) => ({ ...entry }));
      const appearance = supplied.find((entry) => entry.id === "appearance");
      const diagnostics = supplied.find((entry) => entry.id === "diagnostics");
      const system = supplied.find((entry) => entry.id === "system");
      const combine = (id, contents, shared = []) => {
        const root = this.#document.createElement("div");
        root.className = "flt-control-stack";
        const productContent = this.#document.createElement("div");
        productContent.className = "flt-control-stack";
        productContent.dataset.fltProductViewContent = id;
        for (const content of contents) if (content) productContent.append(content);
        root.append(productContent);
        for (const content of shared) if (content) root.append(content);
        return root;
      };
      const navigation = supplied.filter(
        (entry) => !["appearance", "diagnostics", "system"].includes(entry.id)
      );
      navigation.push({
        ...appearance,
        content: combine("appearance", [appearance?.content], [preferences.element]),
        description: appearance?.description ?? "Adjust how FL Tools menus look and behave on this browser and site.",
        id: "appearance",
        label: "Appearance"
      });
      navigation.push({
        ...system,
        aliases: [
          .../* @__PURE__ */ new Set([
            ...system?.aliases ?? [],
            ...diagnostics?.aliases ?? [],
            "diagnostics",
            "settings"
          ])
        ],
        content: combine("system", [system?.content, diagnostics?.content]),
        description: system?.description ?? "Review page and plugin health, export diagnostics, and use product maintenance actions.",
        id: "system",
        label: "System"
      });
      const shell = new ProductShell({
        ...options,
        navigation,
        document: this.#document,
        footer,
        onDiagnostics: this.#diagnostics ? (container) => this.mountDiagnostics(container) : void 0,
        version
      });
      this.#shells.add(shell);
      this.preferences.apply();
      const lifecycle = options.installUrl || options.updateUrl ? new UpdateLifecycle({
        changelog: footer.getChangelog,
        document: this.#document,
        installUrl: options.installUrl ?? options.updateUrl,
        launcher: this.launcher,
        productId: options.productId,
        productName: options.productName,
        releaseUrl: footer.releaseUrl,
        shell,
        updateUrl: options.updateUrl ?? options.installUrl,
        version
      }) : null;
      lifecycle?.start();
      const open = shell.open.bind(shell);
      const close = shell.close.bind(shell);
      shell.open = (openOptions) => {
        for (const other of this.#shells) {
          if (other !== shell) other.close();
        }
        open(openOptions);
        if (this.launcher.has(options.productId)) this.launcher.setActive(options.productId);
      };
      shell.close = () => {
        close();
        if ([...this.#shells].every((candidate) => candidate.element.hidden)) {
          this.launcher.setActive(null);
        }
      };
      const destroy = shell.destroy.bind(shell);
      shell.destroy = () => {
        preferences.destroy();
        lifecycle?.destroy();
        this.#shells.delete(shell);
        destroy();
      };
      return shell;
    }
    notify(item) {
      if (!this.#notificationCenter?.upsert) return null;
      return this.#notificationCenter.upsert(item);
    }
    dismissNotification(id) {
      return this.#notificationCenter?.dismiss(id) ?? false;
    }
    async mountDiagnostics(container, { detailed = false } = {}) {
      if (!container?.replaceChildren || !this.#diagnostics)
        throw new ContractError("Diagnostics is unavailable");
      const doc = this.#document;
      const heading2 = doc.createElement("h3");
      heading2.textContent = "Diagnostics";
      heading2.classList.add("flt-help-anchor");
      heading2.tabIndex = 0;
      attachHelp(
        heading2,
        "Page, technical, console and plugin status. Review before sharing. Nothing is sent automatically. Reset clears only diagnostic session records; saved settings and data are preserved."
      );
      const reportView = doc.createElement("pre");
      reportView.className = "flt-report flt-inline-report";
      reportView.hidden = !detailed;
      reportView.tabIndex = 0;
      reportView.setAttribute("role", "region");
      reportView.setAttribute("aria-label", "Page, technical, console and plugin diagnostics");
      const status = doc.createElement("p");
      status.setAttribute("role", "status");
      const actions = doc.createElement("div");
      actions.className = "flt-diagnostics-actions";
      let lastReport;
      const snapshot = async () => {
        const selfTests = await this.#diagnostics.runSelfTests();
        lastReport = this.#diagnostics.report({ detailed: true, selfTests });
        reportView.textContent = JSON.stringify(lastReport, null, 2);
        return lastReport;
      };
      const action = (label, success, run) => {
        const button = this.controls.button({
          label,
          onClick: async () => {
            button.disabled = true;
            try {
              await run();
              status.textContent = success;
            } catch {
              status.textContent = label + " failed. Please try again.";
            } finally {
              button.disabled = false;
            }
          }
        });
        actions.append(button);
        return button;
      };
      const toggle = action("Show Diagnostics", "", async () => {
        if (reportView.hidden) await snapshot();
        reportView.hidden = !reportView.hidden;
        toggle.textContent = reportView.hidden ? "Show Diagnostics" : "Hide Diagnostics";
        toggle.setAttribute("aria-expanded", String(!reportView.hidden));
      });
      toggle.textContent = detailed ? "Hide Diagnostics" : "Show Diagnostics";
      toggle.setAttribute("aria-expanded", String(detailed));
      action("Copy Diagnostics", "Diagnostics Copied", async () => {
        const report2 = await snapshot();
        const clipboard = doc.defaultView?.navigator?.clipboard;
        if (typeof clipboard?.writeText !== "function")
          throw new ContractError("Clipboard unavailable");
        await clipboard.writeText(JSON.stringify(report2, null, 2));
      });
      action("Clear Activity Log", "Activity Cleared", async () => {
        this.#diagnostics.clearActivity();
        await snapshot();
      });
      action("Refresh State", "State Refreshed", snapshot);
      action("Reset Session State", "Session Reset", async () => {
        this.#diagnostics.resetSession();
        await snapshot();
      });
      action("Export JSON", "Diagnostics Exported", async () => {
        const report2 = await snapshot();
        const view = doc.defaultView;
        const blob = new view.Blob([JSON.stringify(report2, null, 2)], { type: "application/json" });
        const url = view.URL.createObjectURL(blob);
        const link = doc.createElement("a");
        link.href = url;
        link.download = "fl-tools-diagnostics-" + (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-") + ".json";
        doc.body.append(link);
        try {
          link.click();
        } finally {
          link.remove();
          view.setTimeout(() => view.URL.revokeObjectURL(url), 1e3);
        }
      });
      container.replaceChildren(heading2, actions, status, reportView);
      if (detailed) {
        try {
          await snapshot();
        } catch {
          status.textContent = "Diagnostics could not be loaded. Use Refresh State to retry.";
        }
      }
      return {
        snapshot,
        get report() {
          return lastReport;
        }
      };
    }
    async openDiagnostics({ detailed = false } = {}) {
      const content = this.#document.createElement("div");
      const panel = await this.mountDiagnostics(content, { detailed });
      const dialog = this.dialogs.open({
        actions: [{ autofocus: true, label: "Close", value: "close" }],
        content,
        description: "Local FL Tools diagnostics.",
        title: "FL Tools Diagnostics"
      });
      await dialog.result;
      return panel.report;
    }
    async openWhatsNew(productId2) {
      const release = this.#updates?.whatsNew(productId2);
      const content = this.#document.createElement("div");
      content.className = "flt-release-summary";
      if (release) {
        const list = this.#document.createElement("ul");
        for (const bullet of release.summary) {
          const item = this.#document.createElement("li");
          item.textContent = bullet;
          list.append(item);
        }
        content.append(list);
      } else {
        content.textContent = "No installed release summary is available yet.";
      }
      return this.dialogs.open({
        actions: [{ autofocus: true, label: "Close", value: true }],
        content,
        description: release ? `Version ${release.version} (${release.channel})` : "",
        title: "What's New"
      }).result;
    }
    openAbout({ productName, version }) {
      const health = this.#health?.snapshot();
      return this.dialogs.open({
        actions: [{ autofocus: true, label: "Close", value: true }],
        description: `${productName} v${version ?? this.#version}
Core v${this.#version}
Health: ${health?.state ?? "Unavailable"}`,
        title: "Version and health"
      }).result;
    }
    async confirmLegacyCleanup(cleanup, detection) {
      if (!cleanup?.confirmAndDelete || !detection?.confirmationToken) {
        throw new ContractError("Legacy cleanup confirmation requires a detection result");
      }
      if (!detection.found) return Object.freeze({ status: "NOT_NEEDED" });
      const count = detection.local.length + detection.session.length;
      const confirmed = await this.dialogs.confirm({
        confirmLabel: "Delete legacy FL Tools data",
        description: `${count} recognized legacy storage ${count === 1 ? "entry is" : "entries are"} incompatible with this release. Only the listed FL Tools legacy entries will be deleted. This cannot be undone.`,
        destructive: true,
        title: "Start clean with FL Tools?"
      });
      if (!confirmed) return Object.freeze({ status: "CANCELLED" });
      const result3 = await cleanup.confirmAndDelete(detection.confirmationToken);
      this.announcer.announce("Legacy FL Tools data was deleted and verified.");
      return Object.freeze({ ...result3, status: "COMPLETE" });
    }
    stop() {
      if (!this.#started) return;
      this.#survivalObserver?.disconnect();
      this.#survivalObserver = void 0;
      this.#survivalAbort?.abort();
      this.#survivalAbort = void 0;
      this.dialogs.destroy();
      this.#help.stop();
      this.notifications?.destroy();
      for (const shell of [...this.#shells]) shell.destroy();
      this.#shells.clear();
      this.presentation.destroy();
      this.launcher.destroy();
      this.announcer.destroy();
      this.preferences.stop();
      this.theme.destroy();
      this.#started = false;
    }
  };

  // ../fl-tools-core/src/runtime/edition-ownership.js
  var EDITION_PRIORITY = Object.freeze({ basic: 1, pro: 2 });
  function validateHooks(editionId, hooks) {
    if (!(editionId in EDITION_PRIORITY)) {
      throw new ContractError("Unknown edition ownership claimant", { editionId });
    }
    if (typeof hooks?.activate !== "function" || typeof hooks?.deactivate !== "function") {
      throw new ContractError("Edition ownership requires activate and deactivate hooks", {
        editionId
      });
    }
  }
  var EditionOwnership = class {
    #claims = /* @__PURE__ */ new Map();
    #onChange;
    #owner = null;
    #queue = Promise.resolve();
    constructor({ onChange } = {}) {
      this.#onChange = onChange;
    }
    claim(editionId, hooks) {
      validateHooks(editionId, hooks);
      if (this.#claims.has(editionId)) {
        throw new ContractError("Edition already has an ownership claim", { editionId });
      }
      const claim = { ...hooks, editionId, released: false };
      this.#claims.set(editionId, claim);
      const ready = this.#reconcile();
      return Object.freeze({
        ready,
        release: async () => {
          if (claim.released) return this.snapshot();
          claim.released = true;
          await this.#reconcile();
          this.#claims.delete(editionId);
          return this.snapshot();
        },
        snapshot: () => this.snapshot()
      });
    }
    snapshot() {
      return Object.freeze({
        claimants: Object.freeze(
          [...this.#claims.entries()].filter(([, claim]) => !claim.released).map(([editionId]) => editionId).sort()
        ),
        owner: this.#owner
      });
    }
    async stop() {
      const claims = [...this.#claims.values()];
      this.#claims.clear();
      await this.#enqueue(async () => {
        const previousOwner = this.#owner;
        this.#owner = null;
        const previous = claims.find((claim) => claim.editionId === previousOwner);
        await previous?.deactivate({ nextOwner: null, previousOwner });
        this.#notify(previousOwner);
      });
    }
    #enqueue(operation) {
      const transition = this.#queue.catch(() => {
      }).then(operation);
      this.#queue = transition;
      return transition;
    }
    #nextOwner() {
      return [...this.#claims.entries()].filter(([, claim]) => !claim.released).map(([editionId]) => editionId).sort((left, right) => EDITION_PRIORITY[right] - EDITION_PRIORITY[left])[0] ?? null;
    }
    #notify(previousOwner) {
      this.#onChange?.(
        Object.freeze({
          ...this.snapshot(),
          previousOwner
        })
      );
    }
    #reconcile() {
      return this.#enqueue(async () => {
        const nextOwner = this.#nextOwner();
        if (nextOwner === this.#owner) return this.snapshot();
        const previousOwner = this.#owner;
        const previous = previousOwner ? this.#claims.get(previousOwner) : null;
        this.#owner = null;
        await previous?.deactivate({ nextOwner, previousOwner });
        const next = nextOwner ? this.#claims.get(nextOwner) : null;
        if (next) {
          try {
            await next.activate({ nextOwner, previousOwner });
            this.#owner = nextOwner;
          } catch (error) {
            next.released = true;
            this.#claims.delete(nextOwner);
            const fallbackOwner = this.#nextOwner();
            const fallback = fallbackOwner ? this.#claims.get(fallbackOwner) : null;
            await fallback?.activate({ nextOwner: fallbackOwner, previousOwner: nextOwner });
            this.#owner = fallbackOwner;
            this.#notify(previousOwner);
            throw error;
          }
        }
        this.#notify(previousOwner);
        return this.snapshot();
      });
    }
  };

  // ../fl-tools-core/src/runtime/error-boundary.js
  var ErrorBoundary = class {
    #report;
    constructor({ report: report2 }) {
      if (typeof report2 !== "function")
        throw new ContractError("Error boundary requires a report sink");
      this.#report = report2;
    }
    capture(owner, operation, callback, fallback) {
      try {
        const result3 = callback();
        if (result3 && typeof result3.then === "function") {
          return result3.catch((error) => this.#handle(error, owner, operation, fallback));
        }
        return result3;
      } catch (error) {
        return this.#handle(error, owner, operation, fallback);
      }
    }
    #handle(error, owner, operation, fallback) {
      const normalized = error instanceof Error ? error : new Error(String(error));
      this.#report({
        error: normalized,
        operation,
        owner,
        timestamp: Date.now()
      });
      if (typeof fallback === "function") return fallback(normalized);
      return fallback;
    }
  };

  // ../fl-tools-core/src/runtime/core-runtime.js
  var RUNTIME_STATES = Object.freeze({
    CREATED: "CREATED",
    STARTING: "STARTING",
    ACTIVE: "ACTIVE",
    STOPPING: "STOPPING",
    STOPPED: "STOPPED",
    FAILED: "FAILED"
  });
  var CoreRuntime = class {
    #accountId;
    #accountScope;
    #actions = new ActionRegistry();
    #crossTab;
    #document;
    #editionOwnership;
    #diagnostics;
    #conflicts = [];
    #errors = [];
    #eventBus;
    #fetlife;
    #health;
    #features = new ComponentRegistry("feature");
    #modules = new ComponentRegistry("module");
    #metrics;
    #products;
    #notifications;
    #pageAbort;
    #routeMonitor;
    #scanner;
    #scheduler;
    #storage;
    #storageDatabase;
    #storageState = "UNAVAILABLE";
    #ui;
    #updates;
    #state = RUNTIME_STATES.CREATED;
    #version;
    constructor({
      version,
      accountId = null,
      channelFactory,
      document,
      idFactory,
      indexedDB = globalThis.indexedDB,
      localStorage,
      maxScheduled = 1e3,
      observerFactory,
      sessionStorage,
      window
    }) {
      this.#version = version;
      this.#accountId = accountId;
      this.#products = new ProductRegistry({ coreVersion: version });
      this.#health = new HealthMonitor();
      this.#metrics = new RuntimeMetrics({
        estimateStorage: window?.navigator?.storage?.estimate?.bind(window.navigator.storage)
      });
      this.#notifications = new NotificationCenter();
      this.#diagnostics = new DiagnosticsService({
        contextSnapshot: () => this.#diagnosticContext(),
        healthSnapshot: () => this.#health.snapshot(),
        version
      });
      this.#updates = new UpdateManager({ notifications: this.#notifications });
      this.#eventBus = new EventBus({
        onListenerError: (error, context) => this.#recordError(error, "event-listener", context)
      });
      this.#editionOwnership = new EditionOwnership({
        onChange: (snapshot) => this.#eventBus.emit("edition:ownership-changed", snapshot)
      });
      this.#scheduler = new Scheduler({
        maxQueued: maxScheduled,
        metric: (metric) => {
          this.#metrics.recordScheduler(metric);
          if (metric.type === "task") {
            this.#health.record({ durationMs: metric.durationMs, kind: "TASK" });
          }
        }
      });
      this.#fetlife = new FetLifeService({ idFactory });
      this.errorBoundary = new ErrorBoundary({
        report: ({ error, operation, owner }) => this.#recordError(error, operation, { owner })
      });
      if (document?.createElement) {
        this.#ui = new CoreUI({
          diagnostics: this.#diagnostics,
          document,
          health: this.#health,
          idFactory,
          notifications: this.#notifications,
          updates: this.#updates,
          version
        });
      }
      this.#health.subscribe((snapshot) => {
        if (!snapshot.degraded) return;
        this.#notifications.upsert({
          actions: this.#ui ? [{ handler: () => this.#ui.openDiagnostics(), label: "Diagnostics" }] : [],
          bullets: snapshot.reasons.slice(0, 4),
          id: "core.degraded-mode",
          kind: "DEGRADED_MODE",
          message: "Some riskier FL Tools behavior is paused. FetLife remains available.",
          priority: "HIGH",
          title: "FL Tools is in Degraded Mode"
        });
      });
      this.#diagnostics.registerSelfTest({
        category: "CORE_RUNTIME",
        id: "core.runtime",
        run: () => ({
          message: `Core runtime is ${this.#state}.`,
          result: this.#state === RUNTIME_STATES.ACTIVE ? "PASS" : "WARN"
        })
      });
      this.#diagnostics.registerSelfTest({
        category: "PERFORMANCE",
        id: "core.performance",
        run: async () => {
          const metrics = await this.#metrics.refreshStorage();
          return {
            details: metrics,
            message: metrics.violations.length ? `${metrics.violations.length} runtime performance budget ${metrics.violations.length === 1 ? "signal" : "signals"} observed.` : "Runtime performance budgets are within observed limits.",
            result: metrics.violations.length ? "WARN" : "PASS"
          };
        }
      });
      this.#diagnostics.registerSelfTest({
        category: "STORAGE",
        id: "core.storage",
        run: () => ({
          message: `Storage state is ${this.#storageState}.`,
          result: !this.#storage ? "NOT_APPLICABLE" : this.#storageState === "READY" ? "PASS" : "WARN"
        })
      });
      this.#diagnostics.registerSelfTest({
        category: "CORE_RUNTIME",
        id: "core.products",
        run: () => {
          const products = this.#products.list();
          return {
            details: { productIds: products.map(({ id }) => id) },
            message: `${products.length} product${products.length === 1 ? "" : "s"} registered.`,
            result: products.length > 0 ? "PASS" : "WARN"
          };
        }
      });
      this.#diagnostics.registerSelfTest({
        category: "PARSER",
        id: "core.route",
        run: () => {
          const route = this.#routeMonitor?.context?.route;
          return {
            details: {
              confidence: route?.confidence ?? "unavailable",
              kind: route?.kind ?? "unavailable"
            },
            message: route ? `Current route is ${route.kind}.` : "Route context is unavailable.",
            result: route ? "PASS" : "NOT_APPLICABLE"
          };
        }
      });
      this.#diagnostics.registerSelfTest({
        category: "CORE_RUNTIME",
        id: "core.scanner",
        run: () => ({
          message: this.#scanner ? "Page scanner is available." : "Page scanner is unavailable.",
          result: this.#scanner ? "PASS" : "NOT_APPLICABLE"
        })
      });
      this.#crossTab = new CrossTabCoordinator({
        channelFactory,
        eventBus: this.#eventBus,
        getAccountId: () => this.#accountId,
        idFactory
      });
      this.#accountScope = new AccountScope({
        accountId,
        onChange: ({ accountId: nextAccountId, previousAccountId }) => {
          this.#accountId = nextAccountId;
          this.#eventBus.emit("account:changed", {
            accountId: nextAccountId,
            previousAccountId
          });
          this.#eventBus.emit("account:cache-invalidated", { previousAccountId });
        }
      });
      if (indexedDB?.open) {
        this.#storageDatabase = new StorageDatabase({ indexedDB });
        this.#storage = new CoreStorage({
          accountScope: this.#accountScope,
          crossTab: this.#crossTab,
          database: this.#storageDatabase,
          events: this.#eventBus,
          idFactory
        });
        this.legacyCleanup = new LegacyCleanup({
          database: this.#storageDatabase,
          idFactory,
          localStorage,
          sessionStorage
        });
        this.storageLease = new StorageLease({ database: this.#storageDatabase, idFactory });
        this.#storageState = "CLOSED";
      }
      if (window) {
        this.#routeMonitor = new RouteMonitor({
          fetlife: this.#fetlife,
          onChange: (current, previous) => {
            if (this.#document) this.#accountScope.refresh(this.#document);
            this.#eventBus.emit("route:changed", { current, previous });
            if (this.#scanner && previous) this.#scanner.setRoute(current);
          },
          window
        });
      }
      if (document && (observerFactory || globalThis.MutationObserver)) {
        this.#scanner = new Scanner({
          eventBus: this.#eventBus,
          fetlife: this.#fetlife,
          observerFactory,
          scheduler: this.#scheduler
        });
        this.#document = document;
        this.#eventBus.on("scanner:mutated", () => this.#accountScope.refresh(this.#document));
      }
    }
    get services() {
      return Object.freeze({
        account: this.#accountScope,
        actions: this.#actions,
        crossTab: this.#crossTab,
        diagnostics: this.#diagnostics,
        editionOwnership: this.#editionOwnership,
        events: this.#eventBus,
        fetlife: this.#fetlife,
        routes: this.#routeMonitor,
        scanner: this.#scanner,
        scheduler: this.#scheduler,
        health: this.#health,
        notifications: this.#notifications,
        storage: this.#storage,
        storageLease: this.storageLease,
        ui: this.#ui,
        updates: this.#updates
      });
    }
    #diagnosticContext() {
      const routeContext = this.#routeMonitor?.context;
      const navigator = this.#document?.defaultView?.navigator;
      const count = (selector) => this.#document?.querySelectorAll(selector).length ?? 0;
      return {
        pluginStatus: this.#productStatus(),
        conflicts: [...this.#conflicts],
        page: {
          // Counts and capabilities only: never page text, identities, search terms, or markup.
          viewport: {
            width: this.#document?.defaultView?.innerWidth,
            height: this.#document?.defaultView?.innerHeight
          },
          selectorCounts: Object.entries(this.#fetlife.selectors).filter(([, selectors]) => Array.isArray(selectors)).map(([family, selectors]) => ({ family, count: count(selectors.join(",")) })),
          presentation: {
            hidden: count(".flt-state-hidden"),
            dimmed: count(".flt-state-dimmed"),
            highlighted: count(".flt-state-highlighted"),
            blurred: count(".flt-media-blurred")
          },
          images: {
            total: count("img"),
            failed: [...this.#document?.images ?? []].filter(
              (image) => image.complete && image.naturalWidth === 0
            ).length
          },
          nativeNextAvailable: count('a[rel="next"]') > 0
        },
        interface: [...this.#document?.querySelectorAll(".flt-panel") ?? []].map((panel) => ({
          productId: panel.dataset.fltProduct,
          installedVersion: panel.dataset.fltVersion,
          visible: !panel.hidden,
          browseStatus: panel.dataset.fltBrowseStatus ?? null,
          openMenus: [...panel.querySelectorAll('.flt-tool-header[aria-expanded="true"]')].map(
            (node) => node.id
          ),
          switchCount: panel.querySelectorAll('[role="switch"]').length,
          switchesOn: panel.querySelectorAll('[role="switch"][aria-checked="true"]').length,
          disabledControls: panel.querySelectorAll(":disabled").length,
          controlsWithHelp: panel.querySelectorAll("[data-flt-tip]").length
        })),
        components: {
          actions: this.#actions.list(),
          features: this.#features.list().map(({ id, owner }) => ({ id, owner })),
          modules: this.#modules.list().map(({ id, owner }) => ({ id, owner }))
        },
        environment: {
          documentState: this.#document?.readyState ?? "unavailable",
          language: navigator?.language ?? "unavailable",
          platform: navigator?.platform ?? "unavailable",
          userAgent: navigator?.userAgent ?? "unavailable",
          visibilityState: this.#document?.visibilityState ?? "unavailable"
        },
        products: this.#products.list().map(({ channel, features, id, name, type, version }) => ({
          channel,
          declaredFeatures: features,
          id,
          name,
          type,
          version
        })),
        runtime: {
          boundaryErrorCount: this.#errors.length,
          editionOwner: this.#editionOwnership.snapshot().owner,
          identityState: this.#accountId ? "SCOPED" : "UNAVAILABLE",
          scannerState: this.#scanner ? "AVAILABLE" : "UNAVAILABLE",
          schedulerQueued: this.#scheduler.size,
          state: this.#state,
          storageState: this.#storageState,
          performance: this.#metrics.snapshot()
        },
        route: {
          confidence: routeContext?.route?.confidence ?? "unavailable",
          kind: routeContext?.route?.kind ?? "unavailable",
          revision: routeContext?.revision ?? 0
        }
      };
    }
    async start() {
      if (this.#state !== RUNTIME_STATES.CREATED) {
        throw new LifecycleError("Core runtime can only be started once", { state: this.#state });
      }
      this.#state = RUNTIME_STATES.STARTING;
      this.#diagnostics.captureConsole(this.#document?.defaultView);
      try {
        this.#crossTab.start();
        this.#ui?.start();
        if (this.#storage) {
          try {
            await this.#storage.open();
            this.#storageState = "READY";
          } catch (error) {
            this.#storageState = error?.code ?? "STORAGE_RECOVERY_REQUIRED";
            this.#recordError(error, "storage-open");
          }
        }
        await this.#metrics.refreshStorage();
        if (!this.#accountId && this.#document) this.#accountScope.refresh(this.#document);
        const routeContext = this.#routeMonitor?.start();
        if (this.#scanner && routeContext) {
          this.#scanner.start({ root: this.#document, routeContext });
        }
        this.#bindPageSurvival();
        this.#state = RUNTIME_STATES.ACTIVE;
        this.#eventBus.emit("runtime:active", { version: this.#version });
      } catch (error) {
        this.#state = RUNTIME_STATES.FAILED;
        this.#diagnostics.stopCapture();
        this.#recordError(error, "runtime-start");
        throw error;
      }
    }
    registerProduct({ manifest, features = [], modules = [], updateProvider }) {
      if (this.#state !== RUNTIME_STATES.ACTIVE) {
        throw new LifecycleError("Products can register only while Core is active", {
          state: this.#state
        });
      }
      let product;
      try {
        product = this.#products.register(manifest);
      } catch (error) {
        this.#conflicts.push({
          productId: manifest?.id ?? "unknown",
          code: error.code ?? "REGISTRATION_FAILED",
          reason: error.message
        });
        if (this.#conflicts.length > 25) this.#conflicts.shift();
        this.#ui?.announcer.announce("FL Tools product conflict. Open diagnostics for details.", {
          priority: "assertive"
        });
        this.#recordError(error, "product-registration", { productId: manifest?.id ?? null });
        throw error;
      }
      const registeredFeatures = [];
      const registeredModules = [];
      let unregisterUpdate;
      try {
        for (const feature of features) {
          this.#assertOwnedComponent(product, feature, "feature");
          this.#features.register(feature);
          registeredFeatures.push(feature.id);
        }
        for (const module of modules) {
          this.#assertOwnedComponent(product, module, "module");
          this.#modules.register(module);
          registeredModules.push(module.id);
        }
        if (updateProvider) {
          unregisterUpdate = this.#updates.registerProduct({
            channel: product.channel,
            name: product.name,
            productId: product.id,
            provider: updateProvider,
            version: product.version
          });
        }
      } catch (error) {
        unregisterUpdate?.();
        for (const id of registeredFeatures) this.#features.unregister(id);
        for (const id of registeredModules) this.#modules.unregister(id);
        this.#products.unregister(product.id);
        this.#conflicts.push({
          productId: product.id,
          code: error.code ?? "REGISTRATION_FAILED",
          reason: error.message
        });
        if (this.#conflicts.length > 25) this.#conflicts.shift();
        this.#recordError(error, "product-registration", { productId: product.id });
        throw error;
      }
      this.#eventBus.emit("product:registered", { productId: product.id });
      const registration = {
        coreVersion: this.#version,
        productId: product.id,
        status: "REGISTERED"
      };
      Object.defineProperty(registration, "capabilities", {
        enumerable: false,
        value: this.#productCapabilities(product)
      });
      if (updateProvider) {
        registration.checkForUpdates = (options) => this.#updates.check(product.id, options);
        registration.recordInstalled = ({ version, channel = product.channel, summary }) => this.#updates.recordInstalled({
          channel,
          name: product.name,
          productId: product.id,
          summary,
          version
        });
      }
      return Object.freeze(registration);
    }
    setAccountId(accountId) {
      this.#accountScope.set(accountId);
    }
    #productStatus() {
      const products = this.#products.list();
      const owner = this.#editionOwnership.snapshot().owner;
      const ids = /* @__PURE__ */ new Set(["basic", "pro", "compass", ...products.map((product) => product.id)]);
      return [
        { id: "core", version: this.#version, status: this.#state },
        ...[...ids].map((id) => {
          const product = products.find((product2) => product2.id === id);
          return {
            id,
            version: product?.version ?? null,
            status: !product ? "NOT_DETECTED" : product.type === "edition" ? owner === id ? "ACTIVE" : "STANDBY" : "REGISTERED",
            compatible: product ? true : null
          };
        })
      ];
    }
    getStatus() {
      return Object.freeze({
        editionOwner: this.#editionOwnership.snapshot().owner,
        errors: this.#errors.length,
        plugins: this.#productStatus(),
        conflicts: [...this.#conflicts],
        products: this.#products.list().map(({ id, version }) => ({ id, version })),
        state: this.#state,
        storage: this.#storageState,
        health: this.#health.snapshot().state,
        version: this.#version
      });
    }
    async stop(reason = "stop") {
      if ([RUNTIME_STATES.STOPPING, RUNTIME_STATES.STOPPED].includes(this.#state)) return;
      this.#state = RUNTIME_STATES.STOPPING;
      this.#diagnostics.stopCapture();
      this.#eventBus.emit("runtime:stopping", { reason });
      this.#scanner?.stop();
      this.#pageAbort?.abort();
      this.#pageAbort = void 0;
      this.#routeMonitor?.stop(reason);
      try {
        await this.#editionOwnership.stop();
      } catch (error) {
        this.#recordError(error, "edition-ownership-stop");
      }
      this.#ui?.stop();
      this.#actions.clear();
      this.#crossTab.stop();
      this.#storage?.close();
      if (this.#storage) this.#storageState = "CLOSED";
      this.#scheduler.destroy(reason);
      this.#eventBus.destroy();
      this.#state = RUNTIME_STATES.STOPPED;
    }
    #bindPageSurvival() {
      const document = this.#document;
      const view = document?.defaultView;
      if (!document || !view?.addEventListener) return;
      let queued = false;
      const settle = () => {
        if (this.#state !== RUNTIME_STATES.ACTIVE || queued) return;
        queued = true;
        const run = () => {
          queued = false;
          if (this.#state !== RUNTIME_STATES.ACTIVE) return;
          this.#ui?.restoreChrome();
          this.#accountScope.refresh(document);
          this.#scanner?.refresh(document);
          this.#eventBus.emit("page:settled", { url: document.URL });
        };
        if (typeof view.queueMicrotask === "function") view.queueMicrotask(run);
        else view.Promise.resolve().then(run);
      };
      this.#pageAbort = new view.AbortController();
      const options = { signal: this.#pageAbort.signal };
      for (const type of PAGE_NAVIGATION_EVENTS) {
        view.addEventListener(type, settle, options);
        document.addEventListener(type, settle, options);
      }
    }
    #assertOwnedComponent(product, component, kind) {
      if (component?.owner !== product.id) {
        throw new ContractError(`Registered ${kind} owner must match product id`, {
          owner: component?.owner,
          productId: product.id
        });
      }
      if (kind === "feature" && !product.features.includes(component.id)) {
        throw new ContractError("Feature is not declared by the product manifest", {
          featureId: component.id,
          productId: product.id
        });
      }
      const undeclared = (component.permissions ?? []).filter(
        (permission) => !product.permissions.includes(permission)
      );
      if (undeclared.length > 0) {
        throw new ContractError(`${kind} requests undeclared permissions`, {
          id: component.id,
          permissions: undeclared
        });
      }
    }
    #productCapabilities(product) {
      const allowed = new Set(product.permissions);
      const capabilities = {};
      capabilities.products = Object.freeze({ snapshot: () => this.getStatus() });
      if (allowed.has("account")) {
        capabilities.account = Object.freeze({
          assertCurrent: (token) => this.#accountScope.assertCurrent(token),
          capture: () => this.#accountScope.capture()
        });
      }
      if (allowed.has("events")) capabilities.events = this.#eventBus;
      if (allowed.has("actions")) {
        capabilities.actions = Object.freeze({
          invoke: (id, payload) => this.#actions.invoke(id, payload),
          list: () => this.#actions.list(),
          register: ({ handler, id, label }) => this.#actions.register({ handler, id, label, owner: product.id })
        });
      }
      if (allowed.has("crossTab")) capabilities.crossTab = this.#crossTab;
      if (allowed.has("routes")) capabilities.routes = this.#routeMonitor;
      if (allowed.has("scanner")) capabilities.scanner = this.#scanner;
      if (allowed.has("storage")) capabilities.storage = this.#storage;
      if (allowed.has("ui")) capabilities.ui = this.#ui;
      if (allowed.has("diagnostics")) capabilities.diagnostics = this.#diagnostics;
      if (allowed.has("editionOwnership") && product.type === "edition") {
        capabilities.editionOwnership = Object.freeze({
          claim: (hooks) => this.#editionOwnership.claim(product.id, hooks),
          snapshot: () => this.#editionOwnership.snapshot()
        });
      }
      return Object.freeze(capabilities);
    }
    #recordError(error, operation, context = {}) {
      this.#errors.push(
        Object.freeze({
          error: error instanceof Error ? error : new Error(String(error)),
          operation,
          context,
          timestamp: Date.now()
        })
      );
      if (this.#errors.length > 100) this.#errors.shift();
      const category = operation.includes("storage") ? "STORAGE" : operation.includes("parser") ? "PARSER" : operation.includes("product") ? "COMPATIBILITY" : operation.includes("runtime") ? "CORE_RUNTIME" : "FEATURE";
      const severity = operation === "runtime-start" ? "FATAL" : "ERROR";
      const code = error?.code && /^[A-Z][A-Z0-9_]{2,79}$/.test(error.code) ? error.code : `${category}_${operation.replaceAll("-", "_").toUpperCase()}_FAILED`;
      this.#diagnostics.record({
        category,
        code,
        details: context,
        error,
        message: error instanceof Error ? error.message : String(error),
        productId: context.productId ?? null,
        severity
      });
      this.#metrics.recordError(code);
      const kind = category === "STORAGE" ? "STORAGE" : category === "PARSER" ? "PARSER" : category === "COMPATIBILITY" ? "COMPATIBILITY" : "FEATURE";
      this.#health.record({ code, kind, outcome: "FAIL" });
      if (severity === "FATAL") this.#health.enterDegraded(code);
    }
  };

  // ../fl-tools-core/src/runtime/install-global.js
  var CORE_BRAND = /* @__PURE__ */ Symbol.for("typicalbits.fl-tools.core");
  function installCore(globalObject, options) {
    if (!globalObject || typeof globalObject !== "object") {
      throw new ContractError("A browser-like global object is required");
    }
    if (globalObject.FLTools !== void 0) {
      if (globalObject.FLTools?.[CORE_BRAND] !== true) {
        throw new ContractError(
          "window.FLTools is occupied by an unknown runtime. Update all installed FL Tools editions and reload every FetLife tab."
        );
      }
      return Object.freeze({ reused: true, surface: globalObject.FLTools });
    }
    const runtime = new CoreRuntime({
      ...options,
      document: options.document ?? globalObject.document,
      indexedDB: options.indexedDB ?? globalObject.indexedDB,
      localStorage: options.localStorage ?? globalObject.localStorage,
      observerFactory: options.observerFactory ?? (globalObject.MutationObserver ? (callback) => new globalObject.MutationObserver(callback) : void 0),
      sessionStorage: options.sessionStorage ?? globalObject.sessionStorage,
      window: options.window ?? (globalObject.history ? globalObject : void 0)
    });
    const ready = runtime.start();
    const surface = Object.freeze({
      [CORE_BRAND]: true,
      getStatus: () => runtime.getStatus(),
      registerProduct: async (registration) => {
        await ready;
        return runtime.registerProduct(registration);
      },
      version: options.version,
      whenReady: ready.then(() => runtime.getStatus())
    });
    Object.defineProperty(globalObject, "FLTools", {
      configurable: false,
      enumerable: false,
      value: surface,
      writable: false
    });
    return Object.freeze({ ready, reused: false, runtime, surface });
  }

  // ../fl-tools-core/src/runtime/lifecycle.js
  var STATES = Object.freeze({
    CREATED: "CREATED",
    STARTING: "STARTING",
    ACTIVE: "ACTIVE",
    STOPPING: "STOPPING",
    STOPPED: "STOPPED",
    FAILED: "FAILED"
  });

  // src/basic-ui.js
  var PAGE_ENHANCEMENTS = Object.freeze([
    [
      "exactTimestamps",
      "Exact timestamps",
      "Replace relative times with the full local date and time."
    ],
    ["hideBanners", "Hide banners", "Hide supported promotional and install banners."],
    [
      "pictureNavigation",
      "Picture navigation",
      "Keep supported next-picture navigation beside media."
    ],
    ["sharedInterests", "Shared interests", "Highlight interests that also appear on your profile."],
    ["visitedLinks", "Visited links", "Mark links to profiles recorded in Recently Visited."]
  ]);
  function heading(document, text2) {
    const node = document.createElement("h3");
    node.className = "flt-basic-section-title";
    node.textContent = text2;
    return node;
  }
  function section(document, title, id, helper = "") {
    const node = document.createElement("section");
    node.className = "flt-basic-section";
    node.dataset.fltBasicSection = id;
    const titleNode = heading(document, title);
    helper ||= CONTROL_HELP[title] ?? "";
    node.dataset.fltSectionTitle = title;
    node.dataset.fltSectionHelp = helper;
    if (helper) {
      titleNode.classList.add("flt-help-anchor");
      titleNode.dataset.fltTip = helper;
      titleNode.setAttribute("aria-description", helper);
      titleNode.tabIndex = 0;
    }
    node.append(titleNode);
    return node;
  }
  function nestedAccordion(document, root, expanded = /* @__PURE__ */ new Set()) {
    const accordion = document.createElement("div");
    accordion.className = "flt-nested-accordion";
    for (const content of [...root.children]) {
      const title = content.querySelector(":scope > .flt-basic-section-title");
      const label = title?.textContent?.trim() || content.dataset.fltSectionTitle || "Feature";
      const description = title?.dataset.fltTip || title?.getAttribute("aria-description") || content.dataset.fltSectionHelp || CONTROL_HELP[label] || "";
      content.dataset.fltSectionTitle = label;
      content.dataset.fltSectionHelp = description;
      title?.remove();
      const panel = document.createElement("section");
      panel.className = "flt-nested-panel";
      const button = document.createElement("button");
      button.className = "flt-nested-header";
      button.type = "button";
      button.setAttribute("aria-expanded", String(expanded.has(label)));
      if (description) {
        button.classList.add("flt-has-tooltip");
        button.dataset.fltTip = description;
        button.setAttribute("aria-description", description);
      }
      const buttonLabel = document.createElement("span");
      buttonLabel.textContent = label;
      const chevron = document.createElement("span");
      chevron.setAttribute("aria-hidden", "true");
      chevron.textContent = expanded.has(label) ? "\u25BE" : "\u25B8";
      button.append(buttonLabel, chevron);
      content.classList.add("flt-nested-body");
      content.hidden = !expanded.has(label);
      button.addEventListener("click", () => {
        const open = content.hidden;
        for (const sibling of accordion.querySelectorAll(".flt-nested-panel")) {
          const siblingButton = sibling.querySelector(":scope > .flt-nested-header");
          const siblingBody = sibling.querySelector(":scope > .flt-nested-body");
          const active = sibling === panel && open;
          siblingBody.hidden = !active;
          siblingButton.setAttribute("aria-expanded", String(active));
          siblingButton.lastElementChild.textContent = active ? "\u25BE" : "\u25B8";
        }
      });
      panel.append(button, content);
      accordion.append(panel);
    }
    return accordion;
  }
  function fieldRow(document, ...fields) {
    const row = document.createElement("div");
    row.className = "flt-field-row";
    row.append(...fields);
    return row;
  }
  function commitOnChange(input, handler) {
    input.addEventListener("change", () => handler(input.value));
    return input;
  }
  function shortcutFooter(document) {
    const labels = {
      browse: "Browse",
      clean: "Clean",
      nextCard: "Next card",
      next: "Next page",
      openCard: "Open card",
      previousCard: "Previous card",
      sfw: "SFW",
      standard: "Standard",
      top: "Top"
    };
    const list = document.createElement("dl");
    list.className = "flt-shortcut-list";
    for (const action of [
      "browse",
      "standard",
      "clean",
      "sfw",
      "previousCard",
      "nextCard",
      "openCard",
      "next",
      "top"
    ]) {
      const row = document.createElement("div");
      row.className = "flt-shortcut-row";
      const label = document.createElement("dt");
      label.textContent = labels[action];
      const shortcut = document.createElement("dd");
      const key = document.createElement("kbd");
      key.textContent = FIXED_SHORTCUTS[action];
      shortcut.append(key);
      row.append(label, shortcut);
      list.append(row);
    }
    return list;
  }
  function select(document, { label, options, value, onChange }) {
    const field = document.createElement("label");
    field.className = "flt-field";
    const text2 = document.createElement("span");
    text2.className = "flt-label";
    text2.textContent = label;
    attachHelp(text2, CONTROL_HELP[label]);
    const input = document.createElement("select");
    input.className = "flt-input";
    attachHelp(input, CONTROL_HELP[label]);
    for (const [optionValue, optionLabel] of options) {
      const option = document.createElement("option");
      option.value = optionValue;
      option.textContent = optionLabel;
      input.append(option);
    }
    input.value = value;
    input.addEventListener("change", () => onChange(input.value));
    field.append(text2, input);
    return field;
  }
  var BasicUI = class {
    #browseRoot;
    #controls;
    #document;
    #editionId;
    #editionBrowseSections;
    #editionSettingsSections;
    #editionViews;
    #filterImpact = {
      dimmed: 0,
      filterHidden: 0,
      hidden: 0,
      reasons: {},
      revealed: false,
      total: 0,
      visible: 0
    };
    #infiniteState = {
      enabled: false,
      loadedItems: 0,
      loadedPages: 0,
      loading: false,
      paused: false,
      status: "IDLE"
    };
    #onFilterReveal;
    #onInfiniteControl;
    #onManageSoftBlocks;
    #presetToolbar;
    #shortcutFooter;
    #onResetSeen;
    #onMarkUnseen;
    #onResetSettings;
    #onSettings;
    #relationshipContext;
    #loadingMode;
    #settings;
    #settingsRoot;
    #shell;
    #visitHistory = [];
    #visitHistoryRoot;
    #expanded = /* @__PURE__ */ new Set();
    constructor({
      coreUI,
      document,
      onManageSoftBlocks,
      onFilterReveal,
      onInfiniteControl,
      onMarkUnseen,
      onResetSeen,
      onResetSettings,
      onSettings,
      settings,
      visitHistory = [],
      editionId = "basic",
      editionBrowseSections = [],
      editionSettingsSections = [],
      editionViews = [],
      productName = "FL Tools Basic",
      changelog,
      iconUrl,
      releaseUrl,
      installUrl,
      updateUrl,
      relationshipContext = false,
      loadingMode = "page",
      version = "0.0.8"
    }) {
      if (!coreUI?.createShell || !document?.createElement || typeof onSettings !== "function") {
        throw new TypeError("Basic UI dependencies are required");
      }
      this.#controls = coreUI.controls;
      this.#document = document;
      this.#editionId = editionId;
      this.#onManageSoftBlocks = onManageSoftBlocks;
      this.#onFilterReveal = onFilterReveal;
      this.#onInfiniteControl = onInfiniteControl;
      this.#onMarkUnseen = onMarkUnseen;
      this.#onResetSeen = onResetSeen;
      this.#onResetSettings = onResetSettings;
      this.#onSettings = onSettings;
      this.#relationshipContext = relationshipContext === true;
      this.#loadingMode = loadingMode === "profile" ? "profile" : "page";
      this.#settings = settings;
      this.#visitHistory = Array.isArray(visitHistory) ? visitHistory : [];
      const browse = document.createElement("div");
      const system = document.createElement("div");
      this.#editionBrowseSections = editionBrowseSections;
      this.#editionSettingsSections = editionSettingsSections;
      this.#editionViews = editionViews;
      this.#browseRoot = browse;
      this.#settingsRoot = system;
      this.#renderBrowse(browse);
      this.#renderSettings(system);
      const navigation = this.#buildNavigation();
      this.#shell = coreUI.createShell({
        headerItems: [
          editionId === "pro" ? "Automatic browsing rules" : "Everyday browsing controls"
        ],
        changelog,
        iconUrl,
        navigation,
        productId: editionId,
        productName,
        releaseUrl,
        installUrl,
        updateUrl,
        version,
        shortcutFooter: this.#shortcutFooter,
        topContent: this.#presetToolbar
      });
    }
    get shell() {
      return this.#shell;
    }
    setSettings(settings) {
      this.#settings = settings;
      this.#rememberExpanded();
      this.#browseRoot.replaceChildren();
      this.#settingsRoot.replaceChildren();
      this.#renderBrowse(this.#browseRoot);
      this.#renderSettings(this.#settingsRoot);
      if (this.#shortcutFooter) this.#shell.setShortcutFooter(this.#shortcutFooter);
      this.#shell.setTopContent(this.#presetToolbar);
      for (const view of this.#buildNavigation()) {
        this.#shell.replaceViewContent(view.id, view.content);
      }
    }
    setStatus(status) {
      this.#shell.element.dataset.fltBrowseStatus = String(status);
    }
    setVisitHistory(items) {
      this.#visitHistory = Array.isArray(items) ? items : [];
      this.#renderVisitHistoryList();
    }
    setFilterImpact(impact) {
      this.#filterImpact = impact;
      const container = this.#shell?.element.querySelector("[data-flt-filter-impact]");
      if (container) this.#renderFilterImpact(container);
    }
    setInfiniteState(state) {
      const previous = this.#infiniteState;
      this.#infiniteState = state;
      const container = this.#shell?.element.querySelector("[data-flt-infinite-session]");
      if (container && previous.paused && state.paused && previous.status === state.status && state.pauseRemainingSeconds !== null) {
        const countdown = container.querySelector("[data-flt-pause-countdown]");
        if (countdown)
          countdown.textContent = "Resumes in " + Math.floor(state.pauseRemainingSeconds / 60) + ":" + String(state.pauseRemainingSeconds % 60).padStart(2, "0");
      } else if (container) this.#renderInfiniteState(container);
    }
    setRelationshipContext(enabled) {
      const next = enabled === true;
      if (next === this.#relationshipContext) return;
      this.#rememberExpanded();
      this.#relationshipContext = next;
      this.#browseRoot.replaceChildren();
      this.#settingsRoot.replaceChildren();
      this.#renderBrowse(this.#browseRoot);
      this.#renderSettings(this.#settingsRoot);
      this.#shell.setTopContent(this.#presetToolbar);
      for (const view of this.#buildNavigation()) {
        this.#shell.replaceViewContent(view.id, view.content);
      }
    }
    setLoadingMode(mode) {
      const next = mode === "profile" ? "profile" : "page";
      if (next === this.#loadingMode) return;
      this.#rememberExpanded();
      this.#loadingMode = next;
      this.#browseRoot.replaceChildren();
      this.#settingsRoot.replaceChildren();
      this.#renderBrowse(this.#browseRoot);
      this.#renderSettings(this.#settingsRoot);
      this.#shell.setTopContent(this.#presetToolbar);
      for (const view of this.#buildNavigation()) {
        this.#shell.replaceViewContent(view.id, view.content);
      }
    }
    destroy() {
      this.#shell.destroy();
    }
    #commit(mutator) {
      const next = globalThis.structuredClone(this.#settings);
      mutator(next);
      void Promise.resolve(this.#onSettings(next)).then(
        (accepted) => this.setSettings(accepted ?? next)
      );
    }
    #rememberExpanded() {
      this.#expanded = new Set(
        [...this.#shell.element.querySelectorAll('.flt-nested-header[aria-expanded="true"]')].map(
          (button) => button.firstElementChild.textContent
        )
      );
    }
    #buildNavigation() {
      const browseSections = new Map(
        [...this.#browseRoot.children].map((node) => [node.dataset.fltBasicSection, node])
      );
      const settingsSections = new Map(
        [...this.#settingsRoot.children].map((node) => [node.dataset.fltBasicSection, node])
      );
      const take = (source, ids, { accordion = true, retainHeadings = false } = {}) => {
        const root = this.#document.createElement("div");
        for (const id of ids) {
          const node = source.get(id);
          if (node) root.append(node);
        }
        if (!accordion) {
          root.className = "flt-control-stack";
          for (const content of root.children) {
            if (!retainHeadings) content.querySelector(":scope > .flt-basic-section-title")?.remove();
            content.hidden = false;
            content.classList.add(
              retainHeadings ? "flt-direct-settings-section" : "flt-feature-content"
            );
          }
          return root;
        }
        if (root.children.length === 1) {
          const content = root.firstElementChild;
          const title = content.querySelector(":scope > .flt-basic-section-title");
          content.dataset.fltSectionTitle ||= title?.textContent ?? "";
          content.dataset.fltSectionHelp ||= title?.dataset.fltTip ?? "";
          title?.remove();
          content.hidden = false;
          content.classList.add("flt-feature-content");
          return content;
        }
        return nestedAccordion(this.#document, root, this.#expanded);
      };
      const suppliedViews = new Map(this.#editionViews.map((view) => [view.id, view.content]));
      const unavailable = (label) => {
        const node = this.#document.createElement("div");
        node.className = "flt-empty-state";
        node.textContent = `${label} features are unavailable.`;
        return node;
      };
      const navigation = [
        {
          aliases: [
            "filters",
            "presets",
            "media",
            "seen",
            "advanced",
            "infinite-scroll",
            "page-enhancements",
            "recently-visited"
          ],
          content: take(
            browseSections,
            ["page-enhancements", "infinite-scroll", "recently-visited"],
            {
              accordion: false,
              retainHeadings: true
            }
          ),
          id: "browse",
          label: "Browse"
        }
      ];
      if (this.#editionId === "pro") {
        navigation.push({
          content: suppliedViews.get("rules") ?? unavailable("Rules"),
          id: "rules",
          label: "Rules"
        });
      }
      navigation.push({
        aliases: ["shortcuts", "highlighter", "people", "personalize"],
        content: take(settingsSections, ["appearance"], {
          accordion: false,
          retainHeadings: true
        }),
        id: "appearance",
        label: "Appearance"
      });
      navigation.push({
        aliases: ["diagnostics", "settings"],
        content: take(settingsSections, ["diagnostics"], {
          accordion: false,
          retainHeadings: true
        }),
        id: "system",
        label: "System"
      });
      return navigation;
    }
    #renderBrowse(root) {
      const presets = this.#document.createElement("div");
      presets.className = "flt-preset-toolbar";
      const presetLabel = this.#document.createElement("span");
      presetLabel.className = "flt-label";
      presetLabel.textContent = "Browse mode";
      const presetActions = this.#document.createElement("div");
      presetActions.className = "flt-basic-actions";
      const modeLabels = { default: "Standard", minimal: "Clean", sfw: "SFW" };
      const modeDescriptions = {
        default: "Show all supported feed activity.",
        minimal: "Hide reaction and social activity, dim opened items, and reduce page clutter.",
        sfw: "Use Clean feed focus with stronger media protection."
      };
      for (const name of ["default", "minimal", "sfw"]) {
        const button = this.#controls.button({
          label: modeLabels[name],
          onClick: () => this.#commit((next) => next.preset = name),
          variant: this.#settings.preset === name ? "primary" : "default"
        });
        button.dataset.fltTip = modeDescriptions[name];
        button.setAttribute("aria-label", `${modeLabels[name]}. ${modeDescriptions[name]}`);
        button.setAttribute(
          "aria-keyshortcuts",
          FIXED_SHORTCUTS[name === "default" ? "standard" : name]
        );
        button.setAttribute("aria-pressed", String(this.#settings.preset === name));
        presetActions.append(button);
      }
      presets.append(presetLabel, presetActions);
      this.#presetToolbar = presets;
      if (["basic", "pro"].includes(this.#editionId)) {
        const profileLoading = this.#loadingMode === "profile";
        const infinite2 = section(
          this.#document,
          profileLoading ? "Profile Loading" : "Page Loading",
          "infinite-scroll",
          profileLoading ? "Load additional profile cards while browsing FetLife Places under /p/." : "Load the next native page automatically on other supported FetLife pages."
        );
        const pageLimit2 = this.#controls.textField({
          label: "Maximum additional pages (1\u201320)",
          type: "number",
          value: this.#settings.infiniteScroll.pageLimit
        });
        commitOnChange(
          pageLimit2.input,
          (value) => this.#commit((next) => next.infiniteScroll.pageLimit = Number(value))
        );
        infinite2.append(
          this.#controls.toggle({
            checked: this.#settings.infiniteScroll.enabled,
            label: profileLoading ? "Auto Profile Load" : "Auto Page Load",
            onChange: (value) => this.#commit((next) => next.infiniteScroll.enabled = value)
          }).element,
          pageLimit2.element
        );
        const infiniteSession2 = this.#document.createElement("div");
        infiniteSession2.dataset.fltInfiniteSession = "true";
        this.#renderInfiniteState(infiniteSession2);
        infinite2.append(infiniteSession2);
        const enhancements2 = section(
          this.#document,
          "Page Enhancements",
          "page-enhancements",
          "Choose the small display and navigation improvements applied to supported FetLife pages."
        );
        enhancements2.classList.add("flt-control-grid");
        for (const [key, label, description] of PAGE_ENHANCEMENTS) {
          enhancements2.append(
            this.#controls.toggle({
              checked: this.#settings.pageEnhancements[key],
              description,
              label,
              onChange: (value) => this.#commit((next) => next.pageEnhancements[key] = value)
            }).element
          );
        }
        root.append(enhancements2, infinite2, this.#recentlyVisitedSection());
        return;
      }
      const filters = section(
        this.#document,
        "Filters",
        "filters",
        "All selected criteria are evaluated against supported visible profile facts. Choose Dim to keep nonmatches available for review."
      );
      filters.classList.add("flt-control-grid");
      const impact = this.#document.createElement("div");
      impact.dataset.fltFilterImpact = "true";
      this.#renderFilterImpact(impact);
      filters.append(impact);
      const ageOptions = [
        ["", "Any age"],
        ...Array.from({ length: 982 }, (_, index) => {
          const age = String(index + 18);
          return [age, age];
        })
      ];
      const minimum = select(this.#document, {
        label: "Min age",
        onChange: (value) => this.#commit((next) => next.filters.age.minimum = value === "" ? null : Number(value)),
        options: ageOptions,
        value: String(this.#settings.filters.age.minimum ?? "")
      });
      const maximum = select(this.#document, {
        label: "Max age",
        onChange: (value) => this.#commit((next) => next.filters.age.maximum = value === "" ? null : Number(value)),
        options: ageOptions,
        value: String(this.#settings.filters.age.maximum ?? "")
      });
      const matchCriteria = select(this.#document, {
        label: "Match criteria",
        onChange: (value) => this.#commit((next) => next.filters.combine = value),
        options: [
          ["and", "Match all (AND)"],
          ["or", "Match any (OR)"]
        ],
        value: this.#settings.filters.combine
      });
      filters.append(
        fieldRow(this.#document, minimum, maximum),
        matchCriteria,
        select(this.#document, {
          label: "Role matching",
          onChange: (value) => this.#commit((next) => next.filters.roleMode = value),
          options: [
            ["required", "Required"],
            ["preferred", "Preferred"]
          ],
          value: this.#settings.filters.roleMode
        })
      );
      for (const [key, label] of [
        ["genders", "Genders"],
        ["roles", "Roles"],
        ["locations", "Locations or cities"]
      ]) {
        const field = this.#controls.chipField({
          label,
          placeholder: `Add ${label.toLocaleLowerCase()}`,
          values: this.#settings.filters[key],
          onChange: (values2) => this.#commit((next) => next.filters[key] = values2)
        });
        filters.append(field.element);
      }
      const contentMinimums = {};
      for (const [key, label] of [
        ["pictures", "Minimum pictures"],
        ["videos", "Minimum videos"],
        ["writings", "Minimum writings"]
      ]) {
        contentMinimums[key] = this.#controls.textField({
          label,
          placeholder: "1\u20139999",
          type: "number",
          value: this.#settings.filters.minimumContent[key] ?? ""
        });
        commitOnChange(
          contentMinimums[key].input,
          (value) => this.#commit(
            (next) => next.filters.minimumContent[key] = value === "" ? null : Number(value)
          )
        );
      }
      const contentRow = fieldRow(
        this.#document,
        contentMinimums.pictures.element,
        contentMinimums.videos.element,
        contentMinimums.writings.element
      );
      contentRow.classList.add("flt-three-columns");
      filters.append(contentRow);
      const scopes = this.#document.createElement("div");
      scopes.className = "flt-basic-subsection flt-match-scopes";
      scopes.append(heading(this.#document, "Match fields"));
      for (const [key, label] of [
        ["card", "Profile card"],
        ["tags", "Tags"],
        ["nickname", "Nickname"]
      ]) {
        scopes.append(
          this.#controls.toggle({
            checked: this.#settings.filters.scopes.includes(key),
            label,
            onChange: (checked) => this.#commit((next) => {
              next.filters.scopes = checked ? [.../* @__PURE__ */ new Set([...next.filters.scopes, key])] : next.filters.scopes.filter((item) => item !== key);
            })
          }).element
        );
      }
      filters.append(scopes);
      if (this.#relationshipContext) {
        const relationships = this.#document.createElement("div");
        relationships.className = "flt-basic-subsection";
        relationships.append(heading(this.#document, "Relationships"));
        for (const [key, label] of [
          ["following", "Following"],
          ["follows-you", "Follows you"],
          ["friends", "Friends"],
          ["none", "No relationship"]
        ]) {
          const toggle = this.#controls.toggle({
            checked: this.#settings.filters.relationships.includes(key),
            label,
            onChange: (checked) => this.#commit((next) => {
              next.filters.relationships = checked ? [.../* @__PURE__ */ new Set([...next.filters.relationships, key])] : next.filters.relationships.filter((item) => item !== key);
            })
          });
          relationships.append(toggle.element);
        }
        filters.append(relationships);
      }
      for (const [key, label] of [
        ["include", "Include terms"],
        ["exclude", "Exclude terms"],
        ["limit", "Hard limits"]
      ]) {
        const field = this.#controls.chipField({
          label,
          placeholder: key === "limit" ? "e.g. ddlg, watersports, diaper" : `Add ${label.toLocaleLowerCase()}`,
          values: this.#settings.filters.terms[key],
          savedValues: this.#settings.filters.terms.history[key],
          onChange: (terms) => this.#commit((next) => saveTerms(next, key, terms)),
          onForget: (term) => this.#commit((next) => forgetTerm(next, key, term))
        });
        filters.append(field.element);
      }
      const media = section(
        this.#document,
        "Media",
        "media",
        "Choose media presentation and blur strength. Changes apply immediately to supported loaded media."
      );
      media.classList.add("flt-control-grid");
      const blur = this.#controls.textField({
        label: "Blur strength (1\u201310)",
        type: "number",
        value: this.#settings.media.blurPixels
      });
      commitOnChange(
        blur.input,
        (value) => this.#commit((next) => next.media.blurPixels = Number(value))
      );
      const blurControlsActive = this.#settings.media.preset === "sfw" && this.#settings.media.mode === "blur";
      if (blurControlsActive) {
        media.append(blur.element);
        for (const [key, label] of [
          ["blurAvatars", "Blur avatars in SFW"],
          ["blurVideos", "Blur videos in SFW"]
        ]) {
          media.append(
            this.#controls.toggle({
              checked: this.#settings.media[key],
              label,
              onChange: (value) => this.#commit((next) => next.media[key] = value)
            }).element
          );
        }
      } else {
        const mediaStatus = this.#document.createElement("p");
        mediaStatus.setAttribute("role", "status");
        mediaStatus.textContent = "Media follows the active Browse preset. Choose SFW or Minimal to configure blur.";
        media.append(mediaStatus);
      }
      const seen = section(
        this.#document,
        "Seen",
        "seen",
        "Seen state is local to this account. Indicators remain available on every supported profile-card route."
      );
      const seenControls = this.#document.createElement("div");
      seenControls.className = "flt-inline-setting-row";
      seenControls.append(
        this.#controls.toggle({
          checked: this.#settings.seen.showChip,
          label: "Indicators",
          description: "Show Seen indicators on supported profile cards.",
          onChange: (value) => this.#commit((next) => next.seen.showChip = value)
        }).element,
        select(this.#document, {
          label: "Seen display",
          onChange: (value) => this.#commit((next) => next.seen.presentation = value),
          options: [
            ["normal", "Normal"],
            ["dim", "Dim"],
            ["hide", "Hide"]
          ],
          value: this.#settings.seen.presentation
        }),
        this.#controls.button({
          label: "Reset",
          onClick: () => this.#onResetSeen?.(),
          variant: "danger"
        })
      );
      seen.append(seenControls);
      const softBlock = section(
        this.#document,
        "Soft Block",
        "soft-block",
        "Use contextual profile actions to add or remove a Soft Block."
      );
      const softBlockControls = this.#document.createElement("div");
      softBlockControls.className = "flt-inline-setting-row";
      softBlockControls.append(
        this.#controls.button({
          label: "Manage Soft Blocks",
          description: "Search locally known people or enter a numeric profile ID to add a local Soft Block. Review and remove existing blocks here.",
          onClick: () => this.#onManageSoftBlocks?.()
        }),
        select(this.#document, {
          label: "Soft-blocked profiles",
          onChange: (value) => this.#commit((next) => next.softBlock.presentation = value),
          options: [
            ["hide", "Hide"],
            ["dim", "Dim"]
          ],
          value: this.#settings.softBlock.presentation
        })
      );
      softBlock.append(softBlockControls);
      const infinite = section(this.#document, "Infinite Scroll", "infinite-scroll");
      const pageLimit = this.#controls.textField({
        label: "Maximum additional pages (1\u201320)",
        type: "number",
        value: this.#settings.infiniteScroll.pageLimit
      });
      commitOnChange(
        pageLimit.input,
        (value) => this.#commit((next) => next.infiniteScroll.pageLimit = Number(value))
      );
      infinite.append(
        this.#controls.toggle({
          checked: this.#settings.infiniteScroll.enabled,
          label: "Auto Page Load",
          onChange: (value) => this.#commit((next) => next.infiniteScroll.enabled = value)
        }).element,
        pageLimit.element
      );
      const infiniteSession = this.#document.createElement("div");
      infiniteSession.dataset.fltInfiniteSession = "true";
      this.#renderInfiniteState(infiniteSession);
      infinite.append(infiniteSession);
      const enhancements = section(
        this.#document,
        "Page Enhancements",
        "page-enhancements",
        "Choose the small display and navigation improvements applied to supported FetLife pages."
      );
      enhancements.classList.add("flt-control-grid");
      for (const [key, label, description] of PAGE_ENHANCEMENTS) {
        enhancements.append(
          this.#controls.toggle({
            checked: this.#settings.pageEnhancements[key],
            description,
            label,
            onChange: (value) => this.#commit((next) => next.pageEnhancements[key] = value)
          }).element
        );
      }
      root.append(
        filters,
        media,
        seen,
        softBlock,
        infinite,
        enhancements,
        this.#recentlyVisitedSection(),
        ...this.#editionBrowseSections
      );
    }
    #recentlyVisitedSection() {
      const history = section(
        this.#document,
        "Recently Visited",
        "recently-visited",
        "Review the last three profiles opened on this account. Mark unseen removes only the local visit marker."
      );
      const results = this.#document.createElement("div");
      results.dataset.fltVisitHistoryResults = "true";
      history.append(results);
      this.#visitHistoryRoot = results;
      this.#renderVisitHistoryList();
      return history;
    }
    #renderVisitHistoryList() {
      if (!this.#visitHistoryRoot) return;
      const matches = this.#visitHistory.slice(0, 3);
      const status = this.#document.createElement("p");
      status.className = "flt-visit-history-status";
      status.setAttribute("role", "status");
      status.textContent = `${matches.length} recent profile${matches.length === 1 ? "" : "s"}`;
      if (!matches.length) {
        const empty = this.#document.createElement("div");
        empty.className = "flt-empty";
        empty.textContent = "The last three profiles you open will appear here.";
        this.#visitHistoryRoot.replaceChildren(status, empty);
        return;
      }
      const list = this.#document.createElement("ul");
      list.className = "flt-list flt-visit-history-list";
      for (const item of matches) {
        const row = this.#document.createElement("li");
        row.className = "flt-list-item flt-visit-history-item";
        const details = this.#document.createElement("div");
        const name = this.#document.createElement("span");
        const safeUrl = canonicalizeFetLifeUrl(item.profileUrl);
        if (safeUrl) {
          const link = this.#document.createElement("a");
          link.href = safeUrl;
          link.textContent = item.displayName || `Profile ${item.personId}`;
          name.append(link);
        } else {
          name.textContent = item.displayName || `Profile ${item.personId}`;
        }
        const visited = this.#document.createElement("time");
        visited.className = "flt-label";
        visited.dateTime = new Date(item.seenAt).toISOString();
        visited.textContent = new Date(item.seenAt).toLocaleString();
        details.append(name, visited);
        const remove = this.#controls.button({
          label: "Mark unseen",
          description: `Remove the local visit marker for ${item.displayName || `profile ${item.personId}`}.`,
          onClick: () => this.#onMarkUnseen?.(String(item.personId))
        });
        row.append(details, remove);
        list.append(row);
      }
      this.#visitHistoryRoot.replaceChildren(status, list);
    }
    #renderFilterImpact(container) {
      const impact = this.#filterImpact;
      const reasons = Object.entries(impact.reasons ?? {}).sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0])).map(([reason, count]) => `${reason.replace(/^FILTER_/, "").toLocaleLowerCase()}: ${count}`).join(" \xB7 ");
      const summary = this.#document.createElement("p");
      summary.setAttribute("role", "status");
      summary.textContent = `${impact.visible} visible \xB7 ${impact.dimmed} dimmed \xB7 ${impact.hidden} hidden${reasons ? ` \xB7 ${reasons}` : ""}`;
      const reveal = this.#controls.button({
        description: impact.revealed ? "Restore normal filter hiding. Saved filters, Seen, Soft Block, and Pro Quiet state are unchanged." : "Reveal only filter-hidden profiles on this page without changing saved filters.",
        disabled: impact.filterHidden === 0 && !impact.revealed,
        label: impact.revealed ? "Restore filter hiding" : "Temporarily reveal filter-hidden profiles",
        onClick: () => this.#onFilterReveal?.(!impact.revealed)
      });
      container.replaceChildren(summary, reveal);
    }
    #renderInfiniteState(container) {
      const state = this.#infiniteState;
      const summary = this.#document.createElement("p");
      summary.setAttribute("role", "status");
      const unit = this.#loadingMode === "profile" ? "profile pages" : "pages";
      summary.textContent = `${state.loadedPages} of ${state.limit ?? this.#settings.infiniteScroll.pageLimit} additional ${unit} \xB7 ${state.loadedItems} items \xB7 ${state.loading ? "loading" : state.paused ? "paused" : state.status.toLocaleLowerCase()}`;
      const countdown = this.#document.createElement("span");
      countdown.dataset.fltPauseCountdown = "";
      if (state.paused && state.pauseRemainingSeconds != null)
        countdown.textContent = "Resumes in " + Math.floor(state.pauseRemainingSeconds / 60) + ":" + String(state.pauseRemainingSeconds % 60).padStart(2, "0");
      const duration = select(this.#document, {
        label: "Pause auto-loading for",
        value: "",
        options: [
          ["", "Choose duration"],
          ["5", "5 minutes"],
          ["15", "15 minutes"],
          ["30", "30 minutes"],
          ["60", "1 hour"]
        ],
        onChange: (value) => {
          if (value) this.#onInfiniteControl?.pause(Number(value));
        }
      });
      duration.querySelector("select").disabled = !state.enabled;
      const pause = this.#controls.button({
        disabled: !state.enabled,
        label: state.paused ? "Resume this scroll session" : "Pause this scroll session",
        onClick: () => state.paused ? this.#onInfiniteControl?.resume() : this.#onInfiniteControl?.pause()
      });
      const retry = this.#controls.button({
        disabled: state.status !== "FAILED",
        label: "Retry failed page",
        onClick: () => this.#onInfiniteControl?.retry()
      });
      container.replaceChildren(summary, countdown, duration, fieldRow(this.#document, pause, retry));
    }
    #renderSettings(root) {
      const appearance = section(this.#document, "Appearance and accessibility", "appearance");
      appearance.classList.add("flt-appearance-settings");
      for (const [key, label] of [
        ["compact", "Compact layout"],
        ["highContrast", "High contrast"]
      ]) {
        if (this.#editionId === "pro" && key !== "notifications") continue;
        appearance.append(
          this.#controls.toggle({
            checked: this.#settings.ui[key],
            label,
            onChange: (value) => this.#commit((next) => next.ui[key] = value)
          }).element
        );
      }
      this.#shortcutFooter = shortcutFooter(this.#document);
      const reset = section(this.#document, "Diagnostics", "diagnostics");
      reset.querySelector(":scope > .flt-basic-section-title")?.remove();
      reset.classList.add("flt-diagnostics-actions");
      reset.append(
        this.#controls.button({
          label: "Reset Browse settings",
          onClick: () => this.#onResetSettings?.(),
          variant: "danger"
        })
      );
      root.append(appearance, ...this.#editionSettingsSections, reset);
    }
  };

  // src/card-navigation.js
  function destination(candidate) {
    const links = [...candidate.element.querySelectorAll("a[href]")];
    const canonical = candidate.parsed?.canonicalUrl;
    if (canonical) {
      const exact = links.find((link) => {
        try {
          return new link.ownerDocument.defaultView.URL(link.getAttribute("href"), link.ownerDocument.URL).href === canonical;
        } catch {
          return false;
        }
      });
      if (exact) return exact;
    }
    return links[0] ?? (candidate.element.matches?.("a[href]") ? candidate.element : null);
  }
  function selectable(candidate, kinds) {
    const element = candidate?.element;
    return element?.isConnected !== false && !element?.hidden && element?.getAttribute?.("aria-hidden") !== "true" && !element?.classList?.contains("flt-state-hidden") && !element?.matches?.('main, [role="feed"], .flt-root') && (!kinds || kinds.includes(candidate.kind)) && Boolean(destination(candidate) || element?.hasAttribute?.("data-clickable-url-value"));
  }
  var CardNavigator = class {
    #announcer;
    #getCandidates;
    #onOpen;
    #selected;
    constructor({ document, getCandidates, announcer, onOpen }) {
      if (!document?.createElement || typeof getCandidates !== "function") {
        throw new TypeError("Card navigation requires a document and candidates");
      }
      this.#announcer = announcer;
      this.#getCandidates = getCandidates;
      this.#onOpen = onOpen;
    }
    get selected() {
      return this.#selected ?? null;
    }
    move(delta, { kinds } = {}) {
      const candidates = [...this.#getCandidates()].filter((item) => selectable(item, kinds));
      if (!candidates.length) {
        this.clear();
        this.#announcer?.announce?.("No visible cards are available.");
        return null;
      }
      const current = candidates.indexOf(this.#selected);
      const index = current === -1 ? delta < 0 ? candidates.length - 1 : 0 : (current + delta + candidates.length) % candidates.length;
      this.#select(candidates[index]);
      return this.#selected;
    }
    async open() {
      const candidate = this.#selected;
      if (!candidate || !selectable(candidate)) return false;
      await this.#onOpen?.(candidate);
      const link = destination(candidate);
      if (link) link.click();
      else candidate.element.click?.();
      return true;
    }
    clear() {
      if (this.#selected?.element) delete this.#selected.element.dataset.fltCardSelected;
      this.#selected = void 0;
    }
    #select(candidate) {
      this.clear();
      this.#selected = candidate;
      candidate.element.dataset.fltCardSelected = "true";
      candidate.element.scrollIntoView?.({
        block: "nearest",
        behavior: candidate.element.ownerDocument.documentElement.classList.contains("flt-reduce-motion") || candidate.element.ownerDocument.defaultView?.matchMedia?.(
          "(prefers-reduced-motion: reduce)"
        ).matches ? "auto" : "smooth"
      });
      const focusTarget = destination(candidate) ?? candidate.element;
      focusTarget.focus?.({ preventScroll: true });
      const label = candidate.parsed?.title ?? candidate.parsed?.displayName ?? candidate.kind;
      this.#announcer?.announce?.(`Selected ${label}.`);
    }
  };

  // src/feed-focus.js
  var FOCUSED_CATEGORIES = /* @__PURE__ */ new Set(["reaction", "social"]);
  function modeLabel(settings) {
    if (settings?.preset === "sfw") return "SFW";
    if (settings?.preset === "minimal") return "Clean";
    return "Focused";
  }
  function feedFocusRequest(candidate, settings) {
    if (candidate?.kind !== "content" || candidate.context?.route?.kind !== "feed" || settings?.feed?.focus !== "focused") {
      return null;
    }
    const category = candidate.parsed?.metadata?.feedActivityCategory;
    if (!FOCUSED_CATEGORIES.has(category)) return null;
    return Object.freeze({
      detail: `Hidden by ${modeLabel(settings)} feed focus because this is ${category} activity.`,
      reason: "quiet",
      state: "HIDDEN",
      treatment: `feed-${category}`
    });
  }

  // src/filter-engine.js
  function values(value) {
    return Array.isArray(value) ? value.map((item) => String(item).toLocaleLowerCase()) : null;
  }
  function includesAny(haystack, needles) {
    return needles.some((needle) => haystack.some((value) => value.includes(needle)));
  }
  function criterion(active, known, matches, code) {
    if (!active) return null;
    if (!known) return { code, status: "UNKNOWN" };
    return { code, status: matches ? "MATCH" : "NO_MATCH" };
  }
  function evaluateCandidate(candidate, settings) {
    const filters = settings.filters;
    const results = [];
    const ageActive = filters.age.minimum !== null || filters.age.maximum !== null;
    const ageKnown = Number.isFinite(candidate.age);
    results.push(
      criterion(
        ageActive,
        ageKnown,
        ageKnown && (filters.age.minimum === null || candidate.age >= filters.age.minimum) && (filters.age.maximum === null || candidate.age <= filters.age.maximum),
        "FILTER_AGE"
      )
    );
    const locationNeedles = values(filters.locations);
    results.push(
      criterion(
        locationNeedles.length > 0,
        typeof candidate.location === "string",
        typeof candidate.location === "string" && locationNeedles.some(
          (location) => candidate.location.toLocaleLowerCase().includes(location)
        ),
        "FILTER_LOCATION"
      )
    );
    for (const [field, code] of [
      ["pictures", "FILTER_MIN_PICTURES"],
      ["videos", "FILTER_MIN_VIDEOS"],
      ["writings", "FILTER_MIN_WRITINGS"]
    ]) {
      const minimum = filters.minimumContent[field];
      results.push(
        criterion(
          minimum !== null,
          Number.isFinite(candidate[field]),
          Number.isFinite(candidate[field]) && candidate[field] >= minimum,
          code
        )
      );
    }
    results.push(
      criterion(
        filters.genders.length > 0,
        typeof candidate.gender === "string",
        filters.genders.includes(candidate.gender),
        "FILTER_GENDER"
      )
    );
    const candidateRoles = values(candidate.roles);
    if (filters.roles.length && filters.roleMode === "required") {
      results.push(
        criterion(
          true,
          candidateRoles !== null,
          candidateRoles !== null && includesAny(candidateRoles, values(filters.roles)),
          "FILTER_ROLE_REQUIRED"
        )
      );
    }
    const candidateRelationships = Array.isArray(candidate.relationships) ? candidate.relationships : typeof candidate.relationship === "string" ? [candidate.relationship] : null;
    const relationshipKnown = candidateRelationships !== null;
    results.push(
      criterion(
        filters.relationships.length > 0,
        relationshipKnown,
        relationshipKnown && candidateRelationships.some((relationship) => filters.relationships.includes(relationship)),
        "FILTER_RELATIONSHIP"
      )
    );
    const scoped = filters.scopes.flatMap((scope) => values(candidate[scope]) ?? []);
    const sourceKnown = filters.scopes.some((scope) => values(candidate[scope]) !== null);
    const include = values(filters.terms.include);
    const exclude = values(filters.terms.exclude);
    const limit = values(filters.terms.limit);
    if (exclude.length && sourceKnown && includesAny(scoped, exclude)) {
      return Object.freeze({
        reasons: Object.freeze(["FILTER_EXCLUDED_TERM"]),
        status: "NO_MATCH"
      });
    }
    results.push(
      criterion(include.length > 0, sourceKnown, includesAny(scoped, include), "FILTER_INCLUDE")
    );
    if (limit.length && sourceKnown && includesAny(scoped, limit)) {
      return Object.freeze({
        reasons: Object.freeze(["FILTER_HARD_LIMIT"]),
        status: "NO_MATCH"
      });
    }
    const active = results.filter(Boolean);
    const failed = active.filter(({ status: status2 }) => status2 === "NO_MATCH");
    const unknown = active.filter(({ status: status2 }) => status2 === "UNKNOWN");
    const matched = active.filter(({ status: status2 }) => status2 === "MATCH");
    let status = "MATCH";
    if (filters.combine === "and") {
      if (failed.length) status = "NO_MATCH";
      else if (unknown.length) status = "UNKNOWN";
    } else if (active.length && matched.length === 0) {
      status = unknown.length ? "UNKNOWN" : "NO_MATCH";
    }
    return Object.freeze({
      preferredRoleMatch: filters.roleMode === "preferred" && filters.roles.length > 0 && candidateRoles !== null && includesAny(candidateRoles, values(filters.roles)),
      reasons: Object.freeze(
        active.filter((result3) => result3.status !== "MATCH").map((result3) => result3.code)
      ),
      status
    });
  }
  function cardRequests({ filterResult, seen = false, softBlocked = false }, settings) {
    const requests = [];
    if (softBlocked) {
      requests.push({
        reason: "softBlock",
        state: settings.softBlock.presentation === "hide" ? "HIDDEN" : "DIMMED"
      });
    }
    if (filterResult.status === "NO_MATCH") {
      requests.push({
        reason: "filter",
        state: settings.filters.resultMode === "hide" ? "HIDDEN" : "DIMMED"
      });
    }
    if (seen && settings.seen.presentation !== "normal") {
      requests.push({
        reason: "seen",
        state: settings.seen.presentation === "hide" ? "HIDDEN" : "DIMMED"
      });
    }
    return requests;
  }

  // src/page-loader.js
  var CANDIDATE_SELECTOR = [
    "[data-member-card]",
    "[data-user-id]",
    "[data-content-id]",
    "[data-story-uid]",
    "[data-event-id]",
    "[data-group-id]",
    "[data-fltools-fixture-kind]",
    "article"
  ].join(", ");
  var UNSAFE_SELECTOR = "script, style, iframe, object, embed";
  var EXPLICIT_NEXT_SELECTOR = 'a[rel~="next"][href], link[rel~="next"][href], [data-flt-next-page][href]';
  var NEXT_LABEL = /^(next(?:\s+page)?(?:\s*[›»])?|›|»)$/i;
  function identity(node) {
    for (const name of [
      "data-user-id",
      "data-content-id",
      "data-story-uid",
      "data-event-id",
      "data-group-id"
    ]) {
      const value = node.getAttribute(name) || node.querySelector(`[${name}]`)?.getAttribute(name);
      if (value) return `${name}:${value}`;
    }
    const href = node.matches?.("a[href]") ? node.getAttribute("href") : node.querySelector("a[href]")?.getAttribute("href");
    return href ? `href:${href}` : null;
  }
  function listingItems(root) {
    const nodes = [...root.querySelectorAll(CANDIDATE_SELECTOR)];
    return nodes.filter((node) => !nodes.some((other) => other !== node && other.contains(node)));
  }
  function listingRoot(document) {
    const last = listingItems(document).at(-1);
    if (last?.parentElement && last.parentElement !== document.documentElement) {
      return last.closest(".flt-loaded-page")?.parentElement ?? last.parentElement;
    }
    return document.querySelector('[role="feed"]') ?? document.querySelector("main") ?? document.body;
  }
  function placeAfterListing(document, node) {
    const last = listingItems(document).at(-1);
    if (last) {
      const page = last.closest(".flt-loaded-page");
      (page ?? last).after(node);
    } else listingRoot(document).append(node);
    return node;
  }
  function currentPageNumber(url) {
    const raw = url.searchParams.get("page");
    if (raw == null || raw === "") return 1;
    const page = Number.parseInt(raw, 10);
    return Number.isInteger(page) && page > 0 ? page : 1;
  }
  function labeledNextLink(root) {
    for (const link of root.querySelectorAll("a[href]")) {
      const aria = String(link.getAttribute("aria-label") ?? "").trim();
      const title = String(link.getAttribute("title") ?? "").trim();
      const text2 = String(link.textContent ?? "").replace(/\s+/g, " ").trim();
      if (NEXT_LABEL.test(aria) || NEXT_LABEL.test(title) || NEXT_LABEL.test(text2)) return link;
    }
    return null;
  }
  function nextPageFromQuery(root, baseUrl) {
    const current = new globalThis.URL(baseUrl);
    const page = currentPageNumber(current);
    let best;
    for (const link of root.querySelectorAll("a[href]")) {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || href.toLowerCase().startsWith("javascript:")) continue;
      let url;
      try {
        url = new globalThis.URL(href, current);
      } catch {
        continue;
      }
      if (url.origin !== current.origin || url.pathname !== current.pathname) continue;
      const linked = Number.parseInt(url.searchParams.get("page") ?? "", 10);
      if (!Number.isInteger(linked) || linked <= page) continue;
      if (!best || linked < best.page) best = { href: url.href, page: linked };
    }
    return best?.href ?? null;
  }
  function nativeNextPage(root, baseUrl = root.URL) {
    const explicit = root.querySelector(EXPLICIT_NEXT_SELECTOR);
    const link = explicit ?? labeledNextLink(root);
    if (link?.getAttribute("href")) {
      return new globalThis.URL(link.getAttribute("href"), baseUrl).href;
    }
    return nextPageFromQuery(root, baseUrl);
  }
  var BrowserPageLoader = class {
    #document;
    #fetch;
    #seen = /* @__PURE__ */ new Set();
    #window;
    constructor({ document, window, fetchImpl = window?.fetch?.bind(window) }) {
      if (!document?.querySelector || !window?.DOMParser || typeof fetchImpl !== "function") {
        throw new TypeError("Browser page loader dependencies are required");
      }
      this.#document = document;
      this.#window = window;
      this.#fetch = fetchImpl;
      for (const node of listingItems(document)) {
        const key = identity(node);
        if (key) this.#seen.add(key);
      }
    }
    async fetchPage(value, { signal } = {}) {
      const url = new globalThis.URL(value, this.#document.URL);
      if (url.origin !== new globalThis.URL(this.#document.URL).origin) {
        throw new TypeError("Infinite Scroll only loads same-origin pages");
      }
      const response = await this.#fetch(url.href, {
        credentials: "same-origin",
        headers: { Accept: "text/html" },
        signal
      });
      if (!response.ok) throw new Error(`Next page request failed with ${response.status}`);
      const parsed = new this.#window.DOMParser().parseFromString(await response.text(), "text/html");
      const items = [];
      for (const source of listingItems(parsed)) {
        const key = identity(source);
        if (key && this.#seen.has(key)) continue;
        if (key) this.#seen.add(key);
        const node = this.#document.importNode(source, true);
        node.querySelectorAll(UNSAFE_SELECTOR).forEach((unsafe) => unsafe.remove());
        items.push(node);
      }
      return Object.freeze({
        items: Object.freeze(items),
        nextUrl: nativeNextPage(parsed, url.href)
      });
    }
    append(items) {
      if (!items?.length) return;
      const page = this.#document.createElement("div");
      page.className = "flt-root flt-loaded-page";
      page.append(...items);
      const sentinel = this.#document.querySelector(".flt-basic-scroll-sentinel");
      if (sentinel?.isConnected) sentinel.before(page);
      else listingRoot(this.#document).append(page);
    }
  };

  // src/infinite-scroll.js
  var INFINITE_SCROLL_OBSERVER_OPTIONS = Object.freeze({ rootMargin: "200px" });
  var InfiniteScrollController = class {
    #active;
    #append;
    #enabled = false;
    #lastError = null;
    #lastStatus = "IDLE";
    #listeners = /* @__PURE__ */ new Set();
    #fetchPage;
    #limit = 5;
    #loaded = 0;
    #loadedItems = 0;
    #nextUrl;
    #paused = false;
    #pauseUntil = 0;
    #pauseTimer;
    #clock;
    #setInterval;
    #clearInterval;
    #queued = false;
    #seenUrls = /* @__PURE__ */ new Set();
    constructor({
      fetchPage,
      append,
      clock = Date.now,
      setInterval: schedule = globalThis.setInterval,
      clearInterval: cancel = globalThis.clearInterval
    }) {
      if (typeof fetchPage !== "function" || typeof append !== "function") {
        throw new TypeError("Infinite Scroll requires fetch and append functions");
      }
      this.#clock = clock;
      this.#setInterval = schedule;
      this.#clearInterval = cancel;
      this.#fetchPage = fetchPage;
      this.#append = append;
    }
    configure({ enabled, pageLimit }) {
      this.#enabled = Boolean(enabled);
      this.#limit = pageLimit;
      if (!this.#enabled) this.#queued = false;
      this.#notify();
    }
    setNext(url) {
      this.#nextUrl = url || null;
      this.#notify();
    }
    get state() {
      return Object.freeze({
        enabled: this.#enabled,
        error: this.#lastError,
        limit: this.#limit,
        loadedItems: this.#loadedItems,
        loadedPages: this.#loaded,
        loading: Boolean(this.#active),
        nextAvailable: Boolean(this.#nextUrl),
        paused: this.#paused,
        pauseRemainingSeconds: this.#pauseUntil ? Math.max(0, Math.ceil((this.#pauseUntil - this.#clock()) / 1e3)) : null,
        queued: this.#queued,
        status: this.#lastStatus
      });
    }
    subscribe(listener) {
      if (typeof listener !== "function") throw new TypeError("Infinite Scroll listener is required");
      this.#listeners.add(listener);
      listener(this.state);
      return () => this.#listeners.delete(listener);
    }
    pause(minutes = 0) {
      this.#cancelPauseTimer();
      if ([5, 15, 30, 60].includes(minutes)) {
        this.#pauseUntil = this.#clock() + minutes * 6e4;
        this.#pauseTimer = this.#setInterval(() => {
          if (this.#clock() >= this.#pauseUntil) this.resume();
          else this.#notify();
        }, 1e3);
      }
      this.#paused = true;
      this.#queued = false;
      this.#lastStatus = "PAUSED";
      this.#notify();
      return this.state;
    }
    #cancelPauseTimer() {
      if (this.#pauseTimer !== void 0) this.#clearInterval(this.#pauseTimer);
      this.#pauseTimer = void 0;
      this.#pauseUntil = 0;
    }
    resume() {
      this.#cancelPauseTimer();
      this.#paused = false;
      this.#lastStatus = "READY";
      this.#notify();
      return this.state;
    }
    retry({ manual = false, signal } = {}) {
      if (this.#lastStatus !== "FAILED")
        return Promise.resolve(Object.freeze({ status: "NO_RETRY" }));
      return this.requestNext({ manual, signal });
    }
    async requestNext({ manual = false, signal } = {}) {
      if (!this.#enabled && !manual) return Object.freeze({ status: "DISABLED" });
      if (this.#paused) return Object.freeze({ status: "PAUSED" });
      if (this.#active) {
        this.#queued = true;
        this.#lastStatus = "QUEUED";
        this.#notify();
        return Object.freeze({ status: "QUEUED" });
      }
      if (!this.#nextUrl || this.#seenUrls.has(this.#nextUrl))
        return Object.freeze({ status: "END" });
      if (this.#loaded >= this.#limit) return Object.freeze({ status: "LIMIT" });
      const url = this.#nextUrl;
      this.#seenUrls.add(url);
      this.#active = this.#load(url, signal, manual);
      this.#lastStatus = "LOADING";
      this.#lastError = null;
      this.#notify();
      try {
        return await this.#active;
      } finally {
        this.#active = void 0;
        this.#notify();
        if (this.#queued && !this.#paused && !signal?.aborted) {
          this.#queued = false;
          void this.requestNext({ manual, signal });
        }
      }
    }
    reset() {
      this.#cancelPauseTimer();
      this.#queued = false;
      this.#loaded = 0;
      this.#loadedItems = 0;
      this.#lastError = null;
      this.#lastStatus = "IDLE";
      this.#paused = false;
      this.#nextUrl = null;
      this.#seenUrls.clear();
      this.#notify();
    }
    async #load(url, signal, manual) {
      try {
        const page = await this.#fetchPage(url, { signal });
        if (signal?.aborted) return Object.freeze({ status: "ABORTED" });
        if (!page || !Array.isArray(page.items)) throw new TypeError("Next page result is invalid");
        await this.#append(page.items);
        this.#loaded += 1;
        this.#loadedItems += page.items.length;
        this.#nextUrl = page.nextUrl ?? null;
        this.#lastStatus = "APPENDED";
        return Object.freeze({ appended: page.items.length, status: "APPENDED" });
      } catch (error) {
        this.#seenUrls.delete(url);
        if (signal?.aborted || error?.name === "AbortError")
          return Object.freeze({ status: "ABORTED" });
        this.#lastError = error instanceof Error ? error.message : String(error);
        this.#lastStatus = "FAILED";
        this.#notify();
        return Object.freeze({
          error,
          retry: () => this.retry({ manual, signal }),
          status: "FAILED"
        });
      }
    }
    #notify() {
      const state = this.state;
      for (const listener of this.#listeners) listener(state);
    }
  };
  var InfiniteScrollTrigger = class {
    #controller;
    #document;
    #observer;
    #observerFactory;
    #sentinel;
    #unsubscribe;
    constructor({ controller, document, observerFactory }) {
      if (!controller?.requestNext || !document?.createElement) {
        throw new TypeError("Infinite Scroll trigger dependencies are required");
      }
      this.#controller = controller;
      this.#document = document;
      this.#observerFactory = observerFactory;
    }
    start({ enabled, signal, mode = "page" }) {
      this.stop();
      if (!enabled || typeof this.#observerFactory !== "function") return false;
      const sentinel = this.#document.createElement("div");
      sentinel.className = "flt-root flt-basic-scroll-sentinel";
      sentinel.dataset.fltBasicOwned = "true";
      const profileMode = mode === "profile";
      const noun = profileMode ? "profiles" : "page items";
      sentinel.setAttribute("aria-label", profileMode ? "Load more profiles" : "Load the next page");
      const status = this.#document.createElement("span");
      status.textContent = profileMode ? "More profiles load near here." : "The next page loads near here.";
      const pause = this.#document.createElement("button");
      pause.className = "flt-button";
      pause.type = "button";
      pause.addEventListener("click", () => {
        if (this.#controller.state.paused) this.#controller.resume();
        else this.#controller.pause();
      });
      sentinel.append(status, pause);
      let wasPaused = this.#controller.state.paused;
      this.#unsubscribe = this.#controller.subscribe((state) => {
        if (wasPaused && !state.paused && this.#observer) {
          this.#observer.unobserve?.(sentinel);
          this.#observer.observe(sentinel);
        }
        wasPaused = state.paused;
        pause.textContent = state.paused ? "Resume auto-loading" : "Pause auto-loading";
        status.textContent = state.paused ? `${state.loadedPages} additional pages loaded. Auto-loading paused.` : state.loading ? `Loading more ${noun}\u2026` : `${state.loadedPages} additional pages and ${state.loadedItems} items loaded this session.`;
      });
      placeAfterListing(this.#document, sentinel);
      this.#observer = this.#observerFactory(async (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        status.textContent = `Loading more ${noun}\u2026`;
        const result3 = await this.#controller.requestNext({ signal });
        if (result3.status === "APPENDED") placeAfterListing(this.#document, sentinel);
        status.textContent = result3.status === "FAILED" ? `More ${noun} could not be loaded. Use native pagination or retry.` : result3.status === "APPENDED" ? `${result3.appended} more ${noun} loaded.` : `No more ${noun} were loaded.`;
        if (result3.status === "FAILED") {
          const retry = this.#document.createElement("button");
          retry.className = "flt-button";
          retry.type = "button";
          retry.textContent = "Retry";
          retry.addEventListener("click", () => void result3.retry());
          sentinel.append(retry);
        }
      });
      this.#observer.observe(sentinel);
      this.#sentinel = sentinel;
      return true;
    }
    stop() {
      this.#observer?.disconnect();
      this.#observer = void 0;
      this.#unsubscribe?.();
      this.#unsubscribe = void 0;
      this.#sentinel?.remove();
      this.#sentinel = void 0;
    }
  };

  // src/media.js
  function mediaRequest(media, kind = "content") {
    if (!["avatar", "content", "video"].includes(kind)) throw new TypeError("Unknown media kind");
    let mode = media.mode;
    if (media.preset === "nsfw") mode = "show";
    if (media.preset === "sfw" && kind === "avatar" && !media.blurAvatars && mode === "blur") {
      mode = "show";
    }
    if (media.preset === "sfw" && kind === "video" && !media.blurVideos && mode === "blur") {
      mode = "show";
    }
    const state = mode === "hide" ? "HIDDEN" : mode === "blur" ? "BLURRED" : "VISIBLE";
    return Object.freeze({
      blurPixels: media.blurPixels,
      requests: Object.freeze([{ reason: `basic-${kind}`, state }])
    });
  }
  function applyMediaPolicy(presentation, element, media, kind) {
    const decision = mediaRequest(media, kind);
    return presentation.applyMedia(element, decision.requests, {
      blurPixels: decision.blurPixels
    });
  }

  // src/page-tools.js
  function pageSurface(route) {
    if (route?.params?.view === "bookmarks") return "bookmarks";
    if (route?.params?.view === "requests") return "requests";
    if (route?.params?.view === "explore") return "explore";
    if (route?.params?.view === "fetishes") return "fetishes";
    if (route?.params?.place) return "places";
    if (route?.params?.relationshipList) return "relationships";
    return route?.kind ?? "unknown";
  }
  function cardCandidates(candidates) {
    return [...candidates].filter(
      (candidate) => candidate?.element && candidate.element.isConnected !== false && !candidate.element.matches?.('main, [role="feed"], .flt-root')
    );
  }
  var BasicPageTools = class {
    #candidates = [];
    #document;
    #onNextRequest;
    #root;
    #surface;
    constructor({ document, onNextRequest } = {}) {
      if (!document?.createElement) throw new TypeError("Page tools require a document");
      this.#document = document;
      this.#onNextRequest = onNextRequest;
    }
    update({ candidates = [], preset = "default", route } = {}) {
      this.#candidates = cardCandidates(candidates);
      const surface = pageSurface(route);
      this.#document.documentElement.dataset.fltBasicSurface = surface;
      this.#document.documentElement.dataset.fltBasicMode = preset;
      if (surface !== this.#surface || !this.#root?.isConnected) {
        this.#removeRoot();
        this.#surface = surface;
        if (surface === "bookmarks") this.#mountBookmarks();
        if (surface === "requests") this.#mountRequests();
      }
      if (surface === "bookmarks") this.#applyBookmarkFilter();
      if (surface === "requests") this.#renderRequestSummary();
    }
    destroy() {
      this.#removeRoot();
      for (const element of this.#document.querySelectorAll(".flt-basic-bookmark-filtered")) {
        element.classList.remove("flt-basic-bookmark-filtered");
      }
      delete this.#document.documentElement.dataset.fltBasicSurface;
      delete this.#document.documentElement.dataset.fltBasicMode;
      this.#surface = void 0;
      this.#candidates = [];
    }
    #createRoot() {
      const root = this.#document.createElement("section");
      root.className = "flt-root flt-basic-page-tools";
      root.dataset.fltBasicPageTools = "true";
      const main = this.#document.querySelector("main") ?? this.#document.body;
      const heading2 = [...main.querySelectorAll("h1, h2")].find(
        (node) => node.textContent.trim().toLocaleLowerCase() === this.#surface
      );
      if (heading2) heading2.after(root);
      else main.prepend(root);
      this.#root = root;
      return root;
    }
    #mountBookmarks() {
      const root = this.#createRoot();
      root.setAttribute("role", "search");
      const query = this.#document.createElement("input");
      query.className = "flt-input";
      query.type = "search";
      query.placeholder = "Find loaded bookmarks";
      query.setAttribute("aria-label", "Find loaded bookmarks");
      query.dataset.fltBookmarkQuery = "true";
      const type = this.#document.createElement("select");
      type.className = "flt-input";
      type.setAttribute("aria-label", "Bookmark content type");
      type.dataset.fltBookmarkType = "true";
      for (const [value, label] of [
        ["", "All types"],
        ["writings", "Writings"],
        ["pictures", "Pictures"],
        ["videos", "Videos"],
        ["statuses", "Statuses"]
      ]) {
        const option = this.#document.createElement("option");
        option.value = value;
        option.textContent = label;
        type.append(option);
      }
      const status = this.#document.createElement("span");
      status.className = "flt-basic-page-status";
      status.dataset.fltPageToolsStatus = "true";
      query.addEventListener("input", () => this.#applyBookmarkFilter());
      type.addEventListener("change", () => this.#applyBookmarkFilter());
      root.append(query, type, status);
    }
    #applyBookmarkFilter() {
      if (!this.#root) return;
      const query = this.#root.querySelector("[data-flt-bookmark-query]")?.value.trim().toLocaleLowerCase() ?? "";
      const type = this.#root.querySelector("[data-flt-bookmark-type]")?.value ?? "";
      const bookmarks = this.#candidates.filter((candidate) => candidate.kind === "content");
      let visible = 0;
      for (const candidate of bookmarks) {
        const text2 = `${candidate.parsed?.title ?? ""} ${candidate.element.textContent ?? ""}`.replace(/\s+/g, " ").trim().toLocaleLowerCase();
        const matches = (!query || text2.includes(query)) && (!type || candidate.parsed?.metadata?.contentType === type);
        candidate.element.classList.toggle("flt-basic-bookmark-filtered", !matches);
        if (matches) visible += 1;
      }
      const status = this.#root.querySelector("[data-flt-page-tools-status]");
      if (status) status.textContent = `${visible} of ${bookmarks.length} loaded bookmarks`;
    }
    #mountRequests() {
      const root = this.#createRoot();
      const status = this.#document.createElement("span");
      status.className = "flt-basic-page-status";
      status.dataset.fltPageToolsStatus = "true";
      const next = this.#document.createElement("button");
      next.className = "flt-button";
      next.type = "button";
      next.textContent = "Next request";
      next.dataset.fltNextRequest = "true";
      next.addEventListener("click", () => this.#onNextRequest?.());
      root.append(status, next);
    }
    #renderRequestSummary() {
      if (!this.#root) return;
      const counts = /* @__PURE__ */ new Map();
      for (const candidate of this.#candidates) {
        counts.set(candidate.kind, (counts.get(candidate.kind) ?? 0) + 1);
      }
      const labels = { content: "content", event: "event", group: "group", profile: "person" };
      const summary = [...counts].map(([kind, count]) => `${count} ${labels[kind] ?? kind}${count === 1 ? "" : "s"}`).join(" \xB7 ");
      this.#root.querySelector("[data-flt-page-tools-status]").textContent = summary || "No loaded requests";
      const next = this.#root.querySelector("[data-flt-next-request]");
      if (next) next.disabled = counts.size === 0;
    }
    #removeRoot() {
      this.#root?.remove();
      this.#root = void 0;
    }
  };

  // src/page-enhancements.js
  var PageEnhancements = class {
    #document;
    #owned = /* @__PURE__ */ new Set();
    constructor({ document }) {
      if (!document?.createElement) throw new TypeError("Page enhancements require a document");
      this.#document = document;
    }
    apply({ exactTimestamps, hideBanners, pictureNavigation, sharedInterests, visitedLinks }, context = {}) {
      this.clear();
      if (exactTimestamps) {
        for (const time of this.#document.querySelectorAll("time[datetime], [datetime]")) {
          const raw = time.getAttribute("datetime");
          const parsed = Date.parse(raw ?? "");
          if (!Number.isFinite(parsed)) continue;
          time.dataset.fltBasicPreviousText = time.textContent ?? "";
          time.textContent = new Date(parsed).toLocaleString();
          time.dataset.fltBasicExactTime = "true";
          time.classList.add("flt-basic-exact-time");
          this.#owned.add(time);
        }
      }
      if (hideBanners) {
        for (const banner of this.#document.querySelectorAll(
          '[data-flt-banner], [data-controller~="ad-recovery"], [data-controller~="push-notifications-banner"], [data-controller~="pwa-install--prompt"], [data-pwa-install-cta]'
        )) {
          banner.dataset.fltBasicPreviousHidden = String(banner.hidden);
          banner.hidden = true;
          this.#owned.add(banner);
        }
      }
      if (visitedLinks) {
        for (const link of this.#document.querySelectorAll(
          'a[data-flt-person-id], a[href^="/"], a[href^="https://fetlife.com/"]'
        )) {
          if (link.closest(".flt-root")) continue;
          const personId = link.dataset.fltPersonId ?? link.getAttribute("href")?.match(/\/users\/(\d+)/)?.[1];
          const path = link.getAttribute("href")?.replace(/^https:\/\/fetlife\.com/i, "") ?? "";
          const nickname = path.match(/^\/([^/?#]+)(?:[/?#]|$)/)?.[1]?.toLocaleLowerCase();
          if (personId && context.seenIds?.has(personId) || nickname && context.seenNames?.has(nickname)) {
            link.classList.add("flt-basic-visited");
            this.#owned.add(link);
          }
        }
      }
      if (sharedInterests) {
        for (const link of this.#document.querySelectorAll(
          '[data-flt-interest], a[href*="/fetishes/"]'
        )) {
          if (link.closest(".flt-root")) continue;
          const interest = String(link.dataset.fltInterest ?? link.textContent ?? "").replace(/\s+/g, " ").trim().toLocaleLowerCase();
          if (interest && context.interests?.has(interest)) {
            link.classList.add("flt-basic-shared-interest");
            this.#owned.add(link);
          }
        }
      }
      if (pictureNavigation && context.onPictureNavigate) {
        for (const image of this.#document.querySelectorAll("img[data-flt-picture-id]")) {
          const button = this.#document.createElement("button");
          button.className = "flt-button flt-basic-picture-next";
          button.dataset.fltBasicOwned = "true";
          button.type = "button";
          button.textContent = "Next picture";
          button.addEventListener(
            "click",
            () => context.onPictureNavigate(image.dataset.fltPictureId)
          );
          image.after(button);
          this.#owned.add(button);
        }
      }
    }
    clear() {
      for (const node of this.#owned) {
        if (node.dataset.fltBasicPreviousHidden !== void 0) {
          node.hidden = node.dataset.fltBasicPreviousHidden === "true";
          delete node.dataset.fltBasicPreviousHidden;
        } else if (node.dataset.fltBasicExactTime === "true") {
          node.textContent = node.dataset.fltBasicPreviousText ?? "";
          delete node.dataset.fltBasicPreviousText;
          delete node.dataset.fltBasicExactTime;
          node.classList.remove("flt-basic-exact-time");
        } else if (node.dataset.fltBasicOwned === "true") node.remove();
        else node.classList.remove("flt-basic-visited", "flt-basic-shared-interest");
      }
      this.#owned.clear();
    }
  };

  // src/profile-state.js
  var RECENT_PROFILE_LIMIT = 3;
  var BasicProfileState = class {
    #clock;
    #storage;
    constructor({ storage, clock = Date.now }) {
      if (!storage?.get || !storage?.put || !storage?.list) {
        throw new TypeError("Basic profile state requires Core storage");
      }
      this.#storage = storage;
      this.#clock = clock;
    }
    async markSeen({ personId, displayName = null, profileUrl = null, routeKind }) {
      if (!personId || routeKind !== "PROFILE") return Object.freeze({ status: "NOT_ELIGIBLE" });
      const current = await this.#storage.get("people", personId);
      const value = current?.value ?? { personId };
      const next = {
        ...value,
        displayName: displayName ?? value.displayName,
        personId,
        basic: {
          ...value.basic ?? {},
          profileUrl: canonicalizeFetLifeUrl(profileUrl) ?? value.basic?.profileUrl,
          seenAt: this.#clock()
        }
      };
      const record = await this.#storage.put("people", personId, next, {
        expectedRevision: current?.revision ?? 0
      });
      await this.#pruneRecentlyVisited();
      return Object.freeze({ revision: record.revision, status: "RECORDED" });
    }
    async listRecentlyVisited({ query = "", limit = RECENT_PROFILE_LIMIT } = {}) {
      const needle = String(query).trim().toLocaleLowerCase();
      const boundedLimit = Math.min(
        RECENT_PROFILE_LIMIT,
        Math.max(1, Number.parseInt(limit, 10) || RECENT_PROFILE_LIMIT)
      );
      const records = await this.#storage.list("people");
      return records.map((record) => record.value).filter((value) => Number.isFinite(value?.basic?.seenAt)).map((value) => ({
        displayName: value.displayName ?? null,
        personId: String(value.personId),
        profileUrl: canonicalizeFetLifeUrl(value.basic.profileUrl),
        seenAt: value.basic.seenAt
      })).filter(
        (value) => !needle || value.personId.toLocaleLowerCase().includes(needle) || value.displayName?.toLocaleLowerCase().includes(needle)
      ).sort(
        (left, right) => right.seenAt - left.seenAt || left.personId.localeCompare(right.personId)
      ).slice(0, boundedLimit);
    }
    async #pruneRecentlyVisited() {
      const records = (await this.#storage.list("people")).filter((record) => Number.isFinite(record.value?.basic?.seenAt)).sort(
        (left, right) => right.value.basic.seenAt - left.value.basic.seenAt || String(left.recordKey).localeCompare(String(right.recordKey))
      );
      for (const record of records.slice(RECENT_PROFILE_LIMIT)) {
        const basic = { ...record.value.basic };
        delete basic.seenAt;
        delete basic.profileUrl;
        await this.#storage.put(
          "people",
          record.recordKey,
          { ...record.value, basic },
          { expectedRevision: record.revision }
        );
      }
    }
    async markUnseen(personId) {
      if (!personId) return false;
      const current = await this.#storage.get("people", personId);
      if (!Number.isFinite(current?.value?.basic?.seenAt)) return false;
      const basic = { ...current.value.basic };
      delete basic.seenAt;
      delete basic.profileUrl;
      await this.#storage.put(
        "people",
        personId,
        { ...current.value, basic },
        { expectedRevision: current.revision }
      );
      return true;
    }
    async setSoftBlock({ personId, displayName = null, reason = "", presentation = "hide" }) {
      if (!personId || !["hide", "dim"].includes(presentation)) {
        throw new TypeError("Soft Block identity and presentation are required");
      }
      const current = await this.#storage.get("people", personId);
      const value = current?.value ?? { personId };
      const record = await this.#storage.put(
        "people",
        personId,
        {
          ...value,
          displayName: displayName ?? value.displayName,
          personId,
          basic: {
            ...value.basic ?? {},
            softBlock: {
              createdAt: this.#clock(),
              presentation,
              reason: String(reason).trim().slice(0, 240)
            }
          }
        },
        { expectedRevision: current?.revision ?? 0 }
      );
      return Object.freeze({ revision: record.revision, status: "BLOCKED" });
    }
    async removeSoftBlock(personId) {
      const current = await this.#storage.get("people", personId);
      if (!current?.value.basic?.softBlock) return false;
      const basic = { ...current.value.basic };
      delete basic.softBlock;
      await this.#storage.put(
        "people",
        personId,
        { ...current.value, basic },
        { expectedRevision: current.revision }
      );
      return true;
    }
    async listSoftBlocks() {
      const records = await this.#storage.list("people");
      return Object.freeze(
        records.filter((record) => record.value.basic?.softBlock).map(
          (record) => Object.freeze({
            displayName: record.value.displayName ?? null,
            personId: record.value.personId,
            ...record.value.basic.softBlock
          })
        )
      );
    }
    async resetSeen({ confirm }) {
      if (typeof confirm !== "function" || !await confirm())
        return Object.freeze({ cleared: 0, status: "CANCELLED" });
      const records = await this.#storage.list("people");
      let cleared = 0;
      for (const record of records) {
        if (!record.value.basic?.seenAt) continue;
        const basic = { ...record.value.basic };
        delete basic.seenAt;
        await this.#storage.put(
          "people",
          record.recordKey,
          { ...record.value, basic },
          { expectedRevision: record.revision }
        );
        cleared += 1;
      }
      return Object.freeze({ cleared, status: "COMPLETE" });
    }
    async nativeBlock({ personId, confirm, perform }) {
      if (!personId || typeof confirm !== "function" || typeof perform !== "function") {
        throw new TypeError("Native Block requires identity, confirmation, and site action");
      }
      if (!await confirm()) return Object.freeze({ status: "CANCELLED" });
      await perform(personId);
      return Object.freeze({ status: "REQUESTED" });
    }
  };

  // src/seen-items.js
  var SETTINGS_KEY = "basic.seen-items";
  var DEFAULT_LIMIT = 512;
  var KINDS2 = /* @__PURE__ */ new Set(["content", "event", "group"]);
  function cleanText(value, maximum) {
    return typeof value === "string" ? value.trim().slice(0, maximum) : "";
  }
  function normalizeSeenItems(value, limit = DEFAULT_LIMIT) {
    const source = value?.version === 1 && Array.isArray(value.items) ? value.items : [];
    const items = /* @__PURE__ */ new Map();
    for (const candidate of source) {
      const key = cleanText(candidate?.key, 2048);
      const kind = cleanText(candidate?.kind, 20);
      if (!key || !KINDS2.has(kind) || !Number.isFinite(candidate?.seenAt)) continue;
      items.delete(key);
      items.set(key, {
        key,
        kind,
        seenAt: candidate.seenAt,
        ...cleanText(candidate.title, 160) ? { title: cleanText(candidate.title, 160) } : {}
      });
    }
    return {
      items: [...items.values()].sort((left, right) => left.seenAt - right.seenAt).slice(-limit),
      version: 1
    };
  }
  var BasicSeenItems = class {
    #clock;
    #items = /* @__PURE__ */ new Map();
    #limit;
    #storage;
    constructor({ storage, clock = Date.now, limit = DEFAULT_LIMIT }) {
      if (!storage?.get || !storage?.put || !storage?.delete || !Number.isInteger(limit) || limit < 1) {
        throw new TypeError("Seen items require storage and a positive limit");
      }
      this.#clock = clock;
      this.#limit = limit;
      this.#storage = storage;
    }
    get size() {
      return this.#items.size;
    }
    has(key) {
      return this.#items.has(key);
    }
    async load() {
      try {
        const record = await this.#storage.get("settings", SETTINGS_KEY);
        this.#accept(record?.value);
      } catch (error) {
        if (error?.code !== "STORAGE_ACCOUNT_AMBIGUOUS") throw error;
        this.#items.clear();
      }
      return this;
    }
    async mark({ key, kind, title }) {
      const item = normalizeSeenItems({
        items: [{ key, kind, seenAt: this.#clock(), title }],
        version: 1
      }).items[0];
      if (!item) return false;
      for (let attempt = 0; attempt < 3; attempt += 1) {
        try {
          const record = await this.#storage.get("settings", SETTINGS_KEY);
          const current = normalizeSeenItems(record?.value, this.#limit);
          const next = normalizeSeenItems(
            {
              items: [...current.items.filter((entry) => entry.key !== item.key), item],
              version: 1
            },
            this.#limit
          );
          await this.#storage.put("settings", SETTINGS_KEY, next, {
            expectedRevision: record?.revision ?? 0
          });
          this.#accept(next);
          return true;
        } catch (error) {
          if (error?.code === "STORAGE_ACCOUNT_AMBIGUOUS") return false;
          if (error?.code !== "STORAGE_CONFLICT" || attempt === 2) throw error;
        }
      }
      return false;
    }
    async reset() {
      const count = this.#items.size;
      try {
        await this.#storage.delete("settings", SETTINGS_KEY);
      } catch (error) {
        if (error?.code !== "STORAGE_ACCOUNT_AMBIGUOUS") throw error;
      }
      this.#items.clear();
      return count;
    }
    #accept(value) {
      const normalized = normalizeSeenItems(value, this.#limit);
      this.#items = new Map(normalized.items.map((item) => [item.key, item]));
    }
  };
  var SEEN_ITEMS_SETTINGS_KEY = SETTINGS_KEY;

  // src/basic-product.js
  var BASIC_MANIFEST = Object.freeze({
    channel: "stable",
    coreCompatibility: ">=0.0.1 <0.1.0",
    features: Object.freeze([
      "basic.filters",
      "basic.presets",
      "basic.media",
      "basic.seen",
      "basic.soft-block",
      "basic.page-enhancements",
      "basic.navigation",
      "basic.card-navigation",
      "basic.feed-focus",
      "basic.page-tools",
      "basic.seen-items",
      "basic.infinite-scroll",
      "basic.infinite-scroll-session-controls",
      "basic.filter-impact",
      "basic.settings"
    ]),
    id: "basic",
    name: "FL Tools Basic",
    permissions: Object.freeze([
      "actions",
      "diagnostics",
      "crossTab",
      "editionOwnership",
      "events",
      "routes",
      "scanner",
      "storage",
      "ui"
    ]),
    type: "edition",
    version: "0.0.8"
  });
  var COMPONENTS = BASIC_MANIFEST.features.map((id) => ({
    id,
    owner: "basic",
    permissions: BASIC_MANIFEST.permissions
  }));
  var MAX_REMEMBERED_VISITS = 512;
  var PRUNE_CANDIDATE_INTERVAL = 100;
  function visibleFilterText(element) {
    if (typeof element.cloneNode !== "function") {
      const text3 = String(element.textContent ?? "").replace(/\s+/g, " ").trim();
      return text3 ? [text3] : null;
    }
    const clone2 = element.cloneNode(true);
    for (const heading2 of clone2.querySelectorAll('h1, h2, h3, h4, [role="heading"]')) {
      if (!/^hard limits?$/i.test(String(heading2.textContent ?? "").trim())) continue;
      (heading2.closest("section, article, [data-section]") ?? heading2.parentElement)?.remove();
    }
    const text2 = String(clone2.textContent ?? "").replace(/\s+/g, " ").trim();
    return text2 ? [text2] : null;
  }
  function profileFilterFacts(element, parsedFacts = {}, displayName = null) {
    const split = (value) => value ? value.split(",").map((item) => item.trim()).filter(Boolean) : null;
    const fixtureAge = Number(element.dataset.fltAge);
    const age = Number.isFinite(fixtureAge) && fixtureAge >= 18 ? fixtureAge : parsedFacts.age;
    const relationships = split(element.dataset.fltRelationships) ?? (element.dataset.fltRelationship ? [element.dataset.fltRelationship] : parsedFacts.relationships ?? (parsedFacts.relationship ? [parsedFacts.relationship] : null));
    return {
      age: Number.isFinite(age) && age >= 18 ? age : null,
      card: split(element.dataset.fltCard) ?? visibleFilterText(element),
      gender: element.dataset.fltGender || parsedFacts.gender || null,
      limit: split(element.dataset.fltLimit),
      location: element.dataset.fltLocation || parsedFacts.location || null,
      nickname: split(element.dataset.fltNickname) ?? (displayName ? [displayName] : null),
      pictures: Number.isFinite(Number(element.dataset.fltPictures)) ? Number(element.dataset.fltPictures) : parsedFacts.pictures ?? null,
      relationship: relationships?.[0] ?? null,
      relationships,
      roles: split(element.dataset.fltRoles) ?? parsedFacts.roles ?? null,
      tags: split(element.dataset.fltTags) ?? [parsedFacts.gender, ...parsedFacts.roles ?? [], parsedFacts.location].filter(Boolean),
      videos: Number.isFinite(Number(element.dataset.fltVideos)) ? Number(element.dataset.fltVideos) : parsedFacts.videos ?? null,
      writings: Number.isFinite(Number(element.dataset.fltWritings)) ? Number(element.dataset.fltWritings) : parsedFacts.writings ?? null
    };
  }
  function isCurrentItemRoute(candidate) {
    const route = candidate?.context?.route;
    if (route?.kind === "content") return candidate.kind === "content";
    if (route?.kind === "event") {
      return candidate.kind === "event" && route.params?.view !== "list" && Boolean(route.params?.eventId || route.params?.pathIds || route.params?.view === "detail");
    }
    if (route?.kind === "group") {
      return candidate.kind === "group" && route.params?.view !== "list" && Boolean(route.params?.groupId);
    }
    return false;
  }
  function pageLoadingMode(route) {
    return route?.kind === "profile" && route.params?.placeList ? "profile" : "page";
  }
  var BasicProduct = class {
    #abort;
    #actionUnregisters = [];
    #active = false;
    #capabilities;
    #cardNavigator;
    #candidates = /* @__PURE__ */ new Map();
    #document;
    #enhancements;
    #enhancementRevision = 0;
    #editionId;
    #editionExtension;
    #editionName;
    #infiniteScroll;
    #infiniteTrigger;
    #filterReveal = false;
    #launcher;
    #navigation;
    #nativeBlock;
    #profileState;
    #privateSession = false;
    #pictureNavigate;
    #pageTools;
    #processedCandidates = 0;
    #ownership;
    #presentedCards = /* @__PURE__ */ new Set();
    #presentedMedia = /* @__PURE__ */ new Set();
    #results = /* @__PURE__ */ new Map();
    #settings;
    #seenVisits = /* @__PURE__ */ new Set();
    #seenItems;
    #sessionMutedPeople = /* @__PURE__ */ new Set();
    #style;
    #ui;
    #window;
    #onPreviewEscape = (event) => {
      if (event.key === "Escape") this.#setNativePreview(false);
    };
    #onWindowBlur = () => this.#setNativePreview(false);
    constructor({
      registration,
      document,
      window,
      iconUrl,
      fetchPage,
      appendPage,
      editionId = registration?.productId ?? "basic",
      editionExtension,
      editionName = editionId === "pro" ? "FL Tools Pro" : BASIC_MANIFEST.name,
      changelog,
      nativeBlock,
      pictureNavigate,
      releaseUrl,
      installUrl,
      updateUrl,
      version = BASIC_MANIFEST.version
    }) {
      const capabilities = registration?.capabilities;
      if (!capabilities?.storage || !capabilities?.ui || !document || !window || !iconUrl) {
        throw new TypeError("Basic requires its registered Core capabilities and approved badge");
      }
      this.#capabilities = capabilities;
      this.#document = document;
      this.#editionId = editionId;
      this.#editionExtension = editionExtension;
      this.#editionName = editionName;
      this.changelog = changelog;
      this.releaseUrl = releaseUrl;
      this.installUrl = installUrl;
      this.updateUrl = updateUrl ?? installUrl;
      this.version = version;
      this.#window = window;
      this.iconUrl = iconUrl;
      this.#nativeBlock = nativeBlock ?? (async () => {
        const form = [...this.#document.querySelectorAll('form[action*="blockeds"]')].find(
          (candidate) => String(candidate.querySelector('input[name="_method"]')?.value ?? "").toLowerCase() !== "delete"
        );
        if (form) {
          if (typeof form.requestSubmit === "function") form.requestSubmit();
          else form.submit();
          return;
        }
        const modal = this.#document.querySelector(
          '[data-id="block"] [data-id="modal-main-action-button"], [data-id="block"] button[type="submit"]'
        );
        if (modal) {
          modal.click();
          return;
        }
        const candidates = [...this.#document.querySelectorAll('a[href*="block"], button')];
        const control = candidates.find((element) => {
          const label = String(element.textContent ?? "").replace(/\s+/g, " ").trim();
          const href = element.getAttribute?.("href") ?? "";
          return /^(block|block user|block on fetlife)$/i.test(label) || /\/block(?:[/?#]|$)/i.test(href);
        });
        if (!control)
          throw new TypeError("FetLife native Block control is unavailable on this page");
        control.click();
      });
      this.#pictureNavigate = pictureNavigate;
      this.#profileState = new BasicProfileState({
        storage: capabilities.storage
      });
      this.#seenItems = new BasicSeenItems({ storage: capabilities.storage });
      this.#cardNavigator = new CardNavigator({
        announcer: capabilities.ui.announcer,
        document,
        getCandidates: () => this.#candidates.values(),
        onOpen: (candidate) => this.#markItemSeen(candidate)
      });
      this.#pageTools = new BasicPageTools({
        document,
        onNextRequest: () => this.#cardNavigator.move(1, { kinds: ["event", "group", "profile"] })
      });
      this.#enhancements = new PageEnhancements({ document });
      let loader;
      if (!fetchPage && !appendPage && typeof window.fetch === "function") {
        loader = new BrowserPageLoader({ document, window });
      }
      this.#infiniteScroll = new InfiniteScrollController({
        append: appendPage ?? (loader ? (items) => {
          loader.append(items);
          this.#capabilities.scanner?.refresh(this.#document);
        } : () => {
        }),
        fetchPage: fetchPage ?? loader?.fetchPage.bind(loader) ?? (() => ({ items: [], nextUrl: null }))
      });
      this.#infiniteScroll.subscribe((state) => this.#ui?.setInfiniteState(state));
      this.#infiniteTrigger = new InfiniteScrollTrigger({
        controller: this.#infiniteScroll,
        document,
        observerFactory: typeof window.IntersectionObserver === "function" ? (callback) => new window.IntersectionObserver(callback, INFINITE_SCROLL_OBSERVER_OPTIONS) : null
      });
    }
    async start() {
      if (this.#capabilities.editionOwnership) {
        this.#ownership = this.#capabilities.editionOwnership.claim({
          activate: () => this.#activate(),
          deactivate: () => this.#deactivate()
        });
        await this.#ownership.ready;
        return this;
      }
      await this.#activate();
      return this;
    }
    async #activate() {
      if (this.#active) return this;
      this.#abort = new globalThis.AbortController();
      this.#settings = normalizeBasicSettings(await this.#capabilities.storage.getBrowseSettings());
      await this.#seenItems.load();
      const visitHistory = await this.#profileState.listRecentlyVisited();
      this.#active = true;
      try {
        const extension = await this.#editionExtension?.activate?.({
          refreshCandidates: () => this.#refreshCandidates()
        }) ?? [];
        const editionViews = Array.isArray(extension) ? extension : extension.views ?? [];
        const editionBrowseSections = Array.isArray(extension) ? [] : extension.browseSections ?? [];
        const editionSettingsSections = Array.isArray(extension) ? [] : extension.settingsSections ?? [];
        this.#ui = new BasicUI({
          coreUI: this.#capabilities.ui,
          document: this.#document,
          editionId: this.#editionId,
          iconUrl: this.iconUrl,
          editionBrowseSections,
          editionSettingsSections,
          editionViews,
          onDeletePreset: (name) => this.#deletePreset(name),
          onFilterReveal: (active) => this.#setFilterReveal(active),
          onInfiniteControl: {
            pause: (minutes) => this.#infiniteScroll.pause(minutes),
            resume: () => this.#infiniteScroll.resume(),
            retry: () => this.#infiniteScroll.retry({ signal: this.#abort.signal })
          },
          onMarkUnseen: (personId) => this.#markUnseen(personId),
          onPreviewNative: (active) => this.#setNativePreview(active),
          onResetSeen: () => this.#resetSeen(),
          onResetSettings: () => this.#resetSettings(),
          onRenamePreset: (currentName, nextName) => this.#renamePreset(currentName, nextName),
          onSavePreset: (name) => this.#savePreset(name),
          onSettings: (next) => this.#acceptSettings(next),
          productName: this.#editionName,
          changelog: this.changelog,
          releaseUrl: this.releaseUrl,
          installUrl: this.installUrl,
          updateUrl: this.updateUrl,
          relationshipContext: this.#relationshipContext(),
          loadingMode: pageLoadingMode(this.#capabilities.routes?.context?.route),
          settings: this.#settings,
          visitHistory,
          version: this.version
        });
        this.#ui.setInfiniteState(this.#infiniteScroll.state);
        this.#updateResultStatus();
        this.#launcher = this.#capabilities.ui.launcher.register({
          iconUrl: this.iconUrl,
          name: this.#editionName,
          onActivate: () => this.#ui.shell.toggle({ trigger: this.#launcher.button }),
          productId: this.#editionId
        });
        this.#registerActions();
        this.#navigation = new BasicNavigation({
          document: this.#document,
          handlers: {
            browse: () => {
              this.#ui.shell.open({ trigger: this.#launcher.button });
              this.#ui.shell.setView("browse", { focus: true });
            },
            clean: () => void this.#selectPreset("minimal"),
            nextCard: () => this.#cardNavigator.move(1),
            next: () => void this.#infiniteScroll.requestNext({ manual: true, signal: this.#abort.signal }),
            openCard: () => void this.#cardNavigator.open(),
            previousCard: () => this.#cardNavigator.move(-1),
            sfw: () => void this.#selectPreset("sfw"),
            standard: () => void this.#selectPreset("default")
          },
          window: this.#window
        });
        this.#navigation.start();
        this.#document.addEventListener("keydown", this.#onPreviewEscape);
        this.#window.addEventListener("blur", this.#onWindowBlur);
        this.#capabilities.scanner?.subscribe(
          ["content", "event", "feed", "group", "profile"],
          (candidate) => void this.#onCandidate(candidate).catch(
            (error) => this.#recordError(
              error,
              "BASIC_CANDIDATE_FAILED",
              "A scanned page item could not be processed."
            )
          ),
          { signal: this.#abort.signal }
        );
        this.#capabilities.events?.on(
          "page:settled",
          () => {
            this.#mountStyle();
            this.#pruneDetached();
            this.#applyGlobalSettings();
            this.#syncPageTools();
          },
          { signal: this.#abort.signal }
        );
        this.#capabilities.events?.on(
          "route:changed",
          ({ current }) => {
            this.#infiniteScroll.reset();
            this.#filterReveal = false;
            this.#cardNavigator.clear();
            this.#applyGlobalSettings();
            this.#ui?.setRelationshipContext(Boolean(current?.route?.params?.relationshipList));
            this.#ui?.setLoadingMode(pageLoadingMode(current?.route));
            this.#syncPageTools(current?.route);
          },
          { signal: this.#abort.signal }
        );
        this.#capabilities.events?.on(
          "cross-tab:storage-invalidated",
          ({ payload: { storeName, recordKey } }) => {
            if (storeName === "settings" && recordKey === "browse") {
              void this.#reloadSettings().catch(
                (error) => this.#recordError(
                  error,
                  "BASIC_SETTINGS_RELOAD_FAILED",
                  "Browse settings could not be reloaded from another tab."
                )
              );
            }
            if (storeName === "settings" && recordKey === SEEN_ITEMS_SETTINGS_KEY) {
              void this.#seenItems.load().then(() => this.#refreshCandidates()).catch(
                (error) => this.#recordError(
                  error,
                  "BASIC_SEEN_ITEMS_RELOAD_FAILED",
                  "Seen items could not be reloaded from another tab."
                )
              );
            }
            if (storeName === "people") {
              void Promise.all([this.#refreshCandidates(), this.#refreshVisitHistory()]).catch(
                (error) => this.#recordError(
                  error,
                  "BASIC_PEOPLE_REFRESH_FAILED",
                  "Updated people state could not be applied."
                )
              );
            }
          },
          { signal: this.#abort.signal }
        );
        this.#capabilities.events?.on(
          "cross-tab:privacy-state",
          ({ payload }) => {
            this.#privateSession = payload?.enabled === true;
          },
          { signal: this.#abort.signal }
        );
        this.#capabilities.events?.on(
          "account:changed",
          ({ accountId }) => {
            this.#privateSession = false;
            this.#seenVisits.clear();
            this.#cardNavigator.clear();
            this.#clearCandidateState();
            this.#requestPrivateSessionState();
            if (accountId) {
              void Promise.all([
                this.#reloadSettings(),
                this.#seenItems.load(),
                this.#refreshVisitHistory()
              ]).catch(
                (error) => this.#recordError(
                  error,
                  "BASIC_ACCOUNT_REFRESH_FAILED",
                  "Browse state could not be refreshed after the account changed."
                )
              ).finally(() => this.#capabilities.scanner?.refresh(this.#document));
            } else {
              this.#settings = normalizeBasicSettings();
              this.#ui?.setSettings(this.#settings);
              this.#ui?.setVisitHistory([]);
              this.#applyGlobalSettings();
            }
          },
          { signal: this.#abort.signal }
        );
        this.#requestPrivateSessionState();
        this.#mountStyle();
        this.#applyGlobalSettings();
        this.#syncPageTools();
        this.#capabilities.scanner?.refresh(this.#document);
        return this;
      } catch (error) {
        await this.#deactivate();
        throw error;
      }
    }
    async stop() {
      if (this.#ownership) {
        const ownership = this.#ownership;
        this.#ownership = void 0;
        await ownership.release();
      } else {
        await this.#deactivate();
      }
      this.#seenVisits.clear();
    }
    async #deactivate() {
      if (!this.#active) return;
      this.#active = false;
      this.#privateSession = false;
      this.#sessionMutedPeople.clear();
      this.#abort.abort("basic-stop");
      this.#document.removeEventListener("keydown", this.#onPreviewEscape);
      this.#window.removeEventListener("blur", this.#onWindowBlur);
      this.#navigation?.stop();
      this.#cardNavigator.clear();
      this.#pageTools.destroy();
      this.#enhancements.clear();
      this.#infiniteTrigger.stop();
      this.#infiniteScroll.reset();
      this.#filterReveal = false;
      this.#clearCandidateState();
      this.#processedCandidates = 0;
      this.#launcher?.unregister();
      for (const unregister of this.#actionUnregisters.splice(0)) unregister();
      this.#ui?.destroy();
      await this.#editionExtension?.deactivate?.();
      this.#style?.remove();
      this.#launcher = void 0;
      this.#navigation = void 0;
      this.#style = void 0;
      this.#ui = void 0;
      this.#document.documentElement.classList.remove(
        "flt-basic-compact",
        "flt-basic-high-contrast",
        "flt-basic-launcher-left",
        "flt-basic-native-preview",
        "flt-menu-width-compact",
        "flt-menu-width-narrow"
      );
      this.#capabilities.ui.preferences.apply();
    }
    setNextPage(url) {
      this.#infiniteScroll.setNext(url);
    }
    #registerActions() {
      if (!this.#capabilities.actions) return;
      const destinations = this.#editionId === "pro" ? [
        ["browse", "Open Browse"],
        ["rules", "Open Rules"],
        ["settings", "Open System"]
      ] : [
        ["browse", "Open Browse"],
        ["settings", "Open Settings"]
      ];
      for (const [view, label] of destinations) {
        this.#actionUnregisters.push(
          this.#capabilities.actions.register({
            handler: () => {
              this.#ui.shell.open({ trigger: this.#launcher.button });
              this.#ui.shell.setView(view, { focus: true });
            },
            id: `${this.#editionId}.${view}`,
            label
          })
        );
      }
    }
    #setNativePreview(active) {
      this.#document.documentElement.classList.toggle("flt-basic-native-preview", active === true);
    }
    async #selectPreset(preset) {
      const accepted = await this.#acceptSettings({ ...this.#settings, preset });
      this.#capabilities.ui.announcer.announce(
        `Browse mode ${preset === "default" ? "Standard" : preset === "minimal" ? "Clean" : "SFW"}.`
      );
      return accepted;
    }
    async #acceptSettings(value) {
      let next = normalizeBasicSettings(value);
      if (next.preset !== this.#settings.preset) {
        next = applyPreset(next, next.preset, next.presets.custom);
      }
      await this.#capabilities.storage.setBrowseSettings(next);
      if (next.ui.dock !== this.#settings.ui.dock) this.#capabilities.ui.launcher.resetPosition();
      this.#settings = next;
      this.#ui.setSettings(next);
      this.#applyGlobalSettings();
      void this.#refreshCandidates().catch(
        (error) => this.#recordError(
          error,
          "BASIC_SETTINGS_APPLY_FAILED",
          "Browse settings were saved but could not be applied to every current item."
        )
      );
      return next;
    }
    async #reloadSettings() {
      const next = normalizeBasicSettings(await this.#capabilities.storage.getBrowseSettings());
      this.#settings = next;
      this.#ui?.setSettings(next);
      this.#applyGlobalSettings();
      void this.#refreshCandidates().catch(
        (error) => this.#recordError(
          error,
          "BASIC_SETTINGS_APPLY_FAILED",
          "Reloaded Browse settings could not be applied to every current item."
        )
      );
    }
    #applyGlobalSettings() {
      this.#infiniteScroll.configure(this.#settings.infiniteScroll);
      this.#infiniteScroll.setNext(nativeNextPage(this.#document));
      this.#infiniteTrigger.start({
        enabled: this.#settings.infiniteScroll.enabled,
        mode: pageLoadingMode(this.#capabilities.routes?.context?.route),
        signal: this.#abort.signal
      });
      this.#document.documentElement.classList.toggle("flt-basic-compact", this.#settings.ui.compact);
      this.#document.documentElement.classList.toggle(
        "flt-basic-high-contrast",
        this.#settings.ui.highContrast
      );
      this.#document.documentElement.classList.remove("flt-basic-launcher-left");
      this.#ui?.shell.setChrome({ contrast: this.#settings.ui.highContrast });
      this.#capabilities.ui.preferences.adopt({
        menuWidth: this.#settings.ui.menuWidth,
        notifications: this.#settings.ui.notifications
      });
      this.#capabilities.ui.preferences.apply();
      this.#applyMediaSettings();
      this.#syncPageTools();
      void this.#applyPageEnhancements().catch(
        (error) => this.#recordError(
          error,
          "BASIC_PAGE_ENHANCEMENT_FAILED",
          "Page enhancements could not be applied."
        )
      );
    }
    #applyMediaSettings() {
      for (const element of this.#document.querySelectorAll("img, video")) {
        if (element.closest('.flt-root, nav, [role="navigation"]')) continue;
        const kind = element.matches("video") ? "video" : element.closest('[data-flt-avatar], [data-member-card], a[href*="/users/"]') ? "avatar" : "content";
        applyMediaPolicy(this.#capabilities.ui.presentation, element, this.#settings.media, kind);
        this.#presentedMedia.add(element);
      }
    }
    async #applyPageEnhancements() {
      const revision = ++this.#enhancementRevision;
      let people;
      try {
        people = await this.#capabilities.storage.list("people");
      } catch (error) {
        if (error?.code !== "STORAGE_ACCOUNT_AMBIGUOUS") throw error;
        people = [];
      }
      if (revision !== this.#enhancementRevision || this.#abort.signal.aborted) return;
      const seenIds = new Set(
        people.filter((record) => record.value.basic?.seenAt).map((record) => record.value.personId)
      );
      const seenNames = new Set(
        people.filter((record) => record.value.basic?.seenAt).map((record) => record.value.displayName?.toLocaleLowerCase()).filter(Boolean)
      );
      const interests = new Set(
        [...this.#document.querySelectorAll("[data-flt-own-interest]")].map((node) => node.dataset.fltOwnInterest?.toLocaleLowerCase()).filter(Boolean)
      );
      this.#enhancements.apply(this.#settings.pageEnhancements, {
        interests,
        onPictureNavigate: this.#pictureNavigate,
        seenIds,
        seenNames
      });
    }
    async #onCandidate(candidate) {
      this.#processedCandidates += 1;
      if (this.#processedCandidates % PRUNE_CANDIDATE_INTERVAL === 0) this.#pruneDetached();
      this.#candidates.set(candidate.element, candidate);
      if (candidate.confidence === "low") {
        this.#capabilities.ui.presentation.clearCard(candidate.element);
        this.#syncPageTools();
        return;
      }
      if (candidate.kind === "profile") {
        const identity2 = candidate.parsed.identity;
        const personId = identity2?.durable ? identity2.value : null;
        const record = personId ? await this.#getPersonRecord(personId) : null;
        const filterResult = evaluateCandidate(
          profileFilterFacts(
            candidate.element,
            candidate.parsed.metadata?.profileFacts,
            candidate.parsed.displayName
          ),
          this.#settings
        );
        const requests = cardRequests(
          {
            filterResult,
            seen: Boolean(record?.value.basic?.seenAt)
          },
          this.#settings
        );
        if (personId && this.#sessionMutedPeople.has(personId)) {
          requests.push({ reason: "quiet", state: "HIDDEN", treatment: "session-mute" });
        }
        if (this.#filterReveal) {
          const filterRequest = requests.find(
            (request) => request.reason === "filter" && request.state === "HIDDEN"
          );
          if (filterRequest) requests.splice(requests.indexOf(filterRequest), 1);
        }
        requests.push(
          ...await this.#editionExtension?.cardRequests?.({
            candidate,
            personId,
            record,
            settings: this.#settings
          }) ?? []
        );
        const decision = this.#capabilities.ui.presentation.applyCard(candidate.element, requests);
        this.#presentedCards.add(candidate.element);
        this.#results.set(candidate.element, {
          filterReasons: filterResult.reasons,
          filterStatus: filterResult.status,
          state: decision.state
        });
        this.#updateResultStatus();
        if (personId && candidate.safeFor.durable) {
          this.#renderProfileActions(candidate, record?.value.basic ?? {});
        }
        const routeRoot = candidate.element.matches('main, [data-test-id="profile-header"]');
        const visitKey = `${candidate.context.route.url}:${personId}`;
        if (routeRoot && candidate.context.route.kind === "profile" && candidate.safeFor.durable && !this.#seenVisits.has(visitKey) && !this.#privateSession && this.#editionExtension?.allowPassivePersistence?.("seen") !== false) {
          this.#rememberVisit(visitKey);
          await this.#profileState.markSeen({
            displayName: candidate.parsed.displayName,
            personId,
            profileUrl: candidate.parsed.canonicalUrl,
            routeKind: "PROFILE"
          });
          await this.#refreshVisitHistory();
          const refreshed = await this.#capabilities.storage.get("people", personId);
          this.#renderProfileActions(candidate, refreshed?.value.basic ?? {});
        }
      } else {
        const itemKey = this.#itemKey(candidate);
        const requests = [];
        const feedRequest = feedFocusRequest(candidate, this.#settings);
        if (feedRequest) requests.push(feedRequest);
        if (itemKey && this.#seenItems.has(itemKey) && this.#settings.seen.presentation !== "normal" && candidate.context.route.params?.view !== "requests") {
          requests.push({
            detail: "Dimmed because this item was already opened.",
            reason: "seen",
            state: this.#settings.seen.presentation.toUpperCase(),
            treatment: "seen-item"
          });
        }
        requests.push(
          ...await this.#editionExtension?.cardRequests?.({
            candidate,
            settings: this.#settings
          }) ?? []
        );
        const decision = this.#capabilities.ui.presentation.applyCard(candidate.element, requests);
        this.#presentedCards.add(candidate.element);
        this.#results.set(candidate.element, {
          filterReasons: [],
          filterStatus: "NOT_APPLICABLE",
          state: decision.state
        });
        this.#updateResultStatus();
        if (this.#isCurrentItem(candidate) && itemKey && !this.#seenItems.has(itemKey)) {
          await this.#markItemSeen(candidate);
        }
      }
      for (const element of candidate.element.querySelectorAll("img, video")) {
        const kind = element.matches("video") ? "video" : element.closest("[data-flt-avatar]") ? "avatar" : "content";
        applyMediaPolicy(this.#capabilities.ui.presentation, element, this.#settings.media, kind);
        this.#presentedMedia.add(element);
      }
      this.#syncPageTools();
    }
    #itemKey(candidate) {
      if (!["content", "event", "group"].includes(candidate?.kind)) return null;
      return candidate.safeFor?.durable ? candidate.parsed.identity?.key ?? null : null;
    }
    #isCurrentItem(candidate) {
      return isCurrentItemRoute(candidate);
    }
    async #markItemSeen(candidate) {
      const key = this.#itemKey(candidate);
      if (!key || this.#privateSession) return false;
      return this.#seenItems.mark({
        key,
        kind: candidate.kind,
        title: candidate.parsed.title
      });
    }
    #syncPageTools(route = this.#capabilities.routes?.context?.route) {
      this.#pageTools.update({
        candidates: this.#candidates.values(),
        preset: this.#settings?.preset ?? "default",
        route
      });
    }
    #requestPrivateSessionState() {
      try {
        this.#capabilities.crossTab?.publish("privacy-state-query", {}, { scope: "account" });
      } catch (error) {
        this.#recordError(
          error,
          "BASIC_PRIVACY_SYNC_FAILED",
          "Private Session state could not be synchronized."
        );
      }
    }
    #relationshipContext() {
      return Boolean(this.#capabilities.routes?.context?.route?.params?.relationshipList);
    }
    async #resetSeen() {
      const result3 = await this.#profileState.resetSeen({
        confirm: () => this.#capabilities.ui.dialogs.confirm({
          confirmLabel: "Clear Seen",
          description: "Seen profiles and opened content for the current FL Tools account will be cleared.",
          destructive: true,
          title: "Reset Seen profiles?"
        })
      });
      if (result3.status === "COMPLETE") {
        const itemCount = await this.#seenItems.reset();
        this.#capabilities.ui.announcer.announce(
          `${result3.cleared + itemCount} Seen items were reset.`
        );
        await this.#refreshVisitHistory();
        this.#capabilities.scanner?.scan(this.#document);
      }
    }
    async #markUnseen(personId) {
      try {
        const changed = await this.#profileState.markUnseen(personId);
        if (!changed) return;
        await Promise.all([this.#refreshVisitHistory(), this.#refreshCandidates()]);
        this.#capabilities.ui.announcer.announce("The profile was marked unseen.");
      } catch (error) {
        this.#recordError(
          error,
          "BASIC_MARK_UNSEEN_FAILED",
          "The profile could not be marked unseen."
        );
      }
    }
    async #refreshVisitHistory() {
      const items = await this.#profileState.listRecentlyVisited();
      this.#ui?.setVisitHistory(items);
      return items;
    }
    async #resetSettings() {
      const confirmed = await this.#capabilities.ui.dialogs.confirm({
        confirmLabel: "Reset Browse settings",
        description: "Feed Focus, filters, presets, media, Seen presentation, Infinite Scroll, page enhancements, navigation, and Basic display options return to current defaults. Saved people state is not deleted.",
        destructive: true,
        title: "Reset Browse settings?"
      });
      if (!confirmed) return;
      await this.#capabilities.storage.resetBrowseSettings();
      await this.#reloadSettings();
      this.#capabilities.ui.announcer.announce("Browse settings were reset.");
    }
    #explainableChip(label, explanation) {
      const chip = this.#document.createElement("button");
      chip.type = "button";
      chip.className = "flt-root flt-card-chip flt-basic-seen-chip";
      chip.dataset.fltTip = explanation;
      chip.setAttribute("aria-expanded", "false");
      chip.setAttribute("aria-label", explanation);
      chip.textContent = label;
      chip.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        chip.setAttribute(
          "aria-expanded",
          chip.getAttribute("aria-expanded") === "true" ? "false" : "true"
        );
      });
      return chip;
    }
    #renderProfileActions(candidate, basicState) {
      const personId = candidate.parsed.identity.value;
      candidate.element.querySelector(':scope [data-flt-basic-profile-actions="true"]')?.remove();
      candidate.element.querySelector(':scope [data-flt-basic-seen-chip="true"]')?.remove();
      const actions = this.#document.createElement("span");
      actions.className = "flt-basic-card-chips";
      actions.dataset.fltBasicProfileActions = "true";
      actions.addEventListener("click", (event) => event.stopPropagation());
      if (!this.#sessionMutedPeople.has(personId)) {
        const mute = this.#capabilities.ui.controls.button({
          label: "Mute for session",
          onClick: () => void this.#muteForSession(candidate)
        });
        mute.classList.add("flt-root", "flt-card-chip");
        mute.dataset.fltTip = "Hide this person until FL Tools is restarted. Nothing is saved.";
        mute.setAttribute("aria-label", mute.dataset.fltTip);
        actions.append(mute);
      }
      if (basicState.seenAt && this.#settings.seen.showChip) {
        const seen = this.#explainableChip(
          "Seen",
          `Seen because this profile was opened on ${new Date(basicState.seenAt).toLocaleString()}.`
        );
        seen.dataset.fltBasicSeenChip = "true";
        actions.append(seen);
      }
      if (typeof this.#nativeBlock === "function") {
        const native = this.#capabilities.ui.controls.button({
          label: "Block",
          onClick: () => void this.#profileState.nativeBlock({
            confirm: () => this.#capabilities.ui.dialogs.confirm({
              confirmLabel: "Continue to native Block",
              description: "This uses FetLife\u2019s native Block. FL Tools will never run it automatically.",
              destructive: true,
              title: `Block ${candidate.parsed.displayName ?? "this person"} on FetLife?`
            }),
            perform: this.#nativeBlock,
            personId
          })
        });
        native.classList.add("flt-root", "flt-card-chip");
        native.dataset.fltTip = "FetLife Block. This uses FetLife\u2019s own block after you confirm.";
        native.setAttribute("aria-label", native.dataset.fltTip);
        actions.append(native);
      }
      const tray = this.#profileChipTray(candidate.element);
      tray.append(actions);
    }
    #profileChipTray(element) {
      element.classList.add("flt-profile-card-host");
      let tray = element.querySelector(':scope > [data-flt-profile-card-chips="true"]');
      if (!tray) {
        tray = this.#document.createElement("div");
        tray.className = "flt-root flt-profile-card-chips";
        tray.dataset.fltProfileCardChips = "true";
        element.append(tray);
      }
      return tray;
    }
    async #muteForSession(candidate) {
      const personId = candidate.parsed.identity.value;
      const displayName = candidate.parsed.displayName ?? "Profile";
      this.#sessionMutedPeople.add(personId);
      await this.#refreshCandidates();
      this.#capabilities.ui.notify?.({
        actions: [
          {
            handler: async () => {
              this.#sessionMutedPeople.delete(personId);
              await this.#refreshCandidates();
              this.#capabilities.ui.dismissNotification?.("basic.session-mute");
              this.#capabilities.ui.announcer.announce(`${displayName} is visible again.`);
            },
            label: "Undo"
          }
        ],
        bullets: [],
        id: "basic.session-mute",
        kind: "SYSTEM",
        message: `${displayName} is hidden until FL Tools is restarted. Nothing was saved.`,
        priority: "LOW",
        title: "Muted for this session"
      });
      try {
        await this.#editionExtension?.onManualAction?.(
          Object.freeze({ displayName, kind: "mute-person", personId })
        );
      } catch (error) {
        this.#recordError(
          error,
          "BASIC_ACTION_PROMOTION_FAILED",
          "The session action worked, but the edition could not offer an automatic rule."
        );
      }
    }
    async #refreshCandidates() {
      for (const [element, candidate] of [...this.#candidates]) {
        if (!element.isConnected) {
          this.#candidates.delete(element);
          this.#results.delete(element);
          continue;
        }
        await this.#onCandidate(candidate);
      }
    }
    #clearCandidateState() {
      for (const element of this.#presentedCards)
        this.#capabilities.ui.presentation.clearCard(element);
      for (const element of this.#presentedMedia)
        this.#capabilities.ui.presentation.clearMedia(element);
      this.#presentedCards.clear();
      this.#presentedMedia.clear();
      this.#candidates.clear();
      this.#results.clear();
      this.#updateResultStatus();
    }
    async #getPersonRecord(personId) {
      try {
        return await this.#capabilities.storage.get("people", personId);
      } catch (error) {
        if (error?.code === "STORAGE_ACCOUNT_AMBIGUOUS") return null;
        throw error;
      }
    }
    #pruneDetached() {
      this.#capabilities.ui.presentation.pruneDisconnected?.();
      for (const element of this.#presentedCards) {
        if (!element.isConnected) this.#presentedCards.delete(element);
      }
      for (const element of this.#presentedMedia) {
        if (!element.isConnected) this.#presentedMedia.delete(element);
      }
      for (const element of this.#candidates.keys()) {
        if (!element.isConnected) {
          this.#candidates.delete(element);
          this.#results.delete(element);
        }
      }
    }
    #rememberVisit(visitKey) {
      this.#seenVisits.delete(visitKey);
      this.#seenVisits.add(visitKey);
      while (this.#seenVisits.size > MAX_REMEMBERED_VISITS) {
        this.#seenVisits.delete(this.#seenVisits.values().next().value);
      }
    }
    #updateResultStatus() {
      const results = [...this.#results.entries()].filter(([element]) => element.isConnected).map(([, result3]) => result3);
      const states = results.map((result3) => result3.state);
      const shown = states.filter((state) => state !== "HIDDEN").length;
      this.#ui?.setStatus(`${shown} of ${states.length} shown`);
      const reasons = {};
      for (const result3 of results) {
        if (result3.filterStatus !== "NO_MATCH") continue;
        for (const reason of result3.filterReasons) reasons[reason] = (reasons[reason] ?? 0) + 1;
      }
      this.#ui?.setFilterImpact({
        dimmed: states.filter((state) => state === "DIMMED").length,
        filterHidden: results.filter(
          (result3) => result3.filterStatus === "NO_MATCH" && this.#settings.filters.resultMode === "hide"
        ).length,
        hidden: states.filter((state) => state === "HIDDEN").length,
        reasons,
        revealed: this.#filterReveal,
        total: states.length,
        visible: states.filter((state) => state === "VISIBLE").length
      });
    }
    #setFilterReveal(active) {
      this.#filterReveal = active === true;
      void this.#refreshCandidates().then(
        () => this.#capabilities.ui.announcer.announce(
          this.#filterReveal ? "Filter-hidden profiles are temporarily revealed on this page. Other safety and preference states remain active." : "Saved filter hiding is restored."
        )
      );
    }
    async #savePreset(name) {
      try {
        const next = saveCustomPreset(this.#settings, name);
        await this.#capabilities.storage.setBrowseSettings(next);
        this.#settings = next;
        this.#ui.setSettings(next);
        this.#capabilities.ui.announcer.announce(`Custom preset ${name.trim()} was saved.`);
      } catch (error) {
        this.#capabilities.diagnostics?.record({
          category: "FEATURE",
          code: "BASIC_PRESET_SAVE_FAILED",
          error,
          message: "The custom Browse preset could not be saved.",
          severity: "WARN"
        });
        this.#capabilities.ui.announcer.announce("The custom preset could not be saved.", {
          priority: "assertive"
        });
      }
    }
    async #renamePreset(currentName, nextName) {
      try {
        const next = renameCustomPreset(this.#settings, currentName, nextName);
        await this.#capabilities.storage.setBrowseSettings(next);
        this.#settings = next;
        this.#ui.setSettings(next);
        this.#capabilities.ui.announcer.announce(
          `Custom preset ${currentName} was renamed to ${nextName.trim()}.`
        );
      } catch (error) {
        this.#recordError(
          error,
          "BASIC_PRESET_RENAME_FAILED",
          "The custom Browse preset could not be renamed."
        );
        this.#capabilities.ui.announcer.announce("The custom preset could not be renamed.", {
          priority: "assertive"
        });
      }
    }
    async #deletePreset(name) {
      const confirmed = await this.#capabilities.ui.dialogs.confirm({
        confirmLabel: "Delete custom preset",
        description: this.#settings.preset === name ? "This preset is active. Deleting it will apply the immutable Default Browse policy." : "This removes only the saved Browse preset. People and product data are unchanged.",
        destructive: true,
        title: `Delete ${name}?`
      });
      if (!confirmed) return;
      try {
        const next = deleteCustomPreset(this.#settings, name);
        await this.#capabilities.storage.setBrowseSettings(next);
        this.#settings = next;
        this.#ui.setSettings(next);
        this.#applyGlobalSettings();
        await this.#refreshCandidates();
        this.#capabilities.ui.announcer.announce(`Custom preset ${name} was deleted.`);
      } catch (error) {
        this.#recordError(
          error,
          "BASIC_PRESET_DELETE_FAILED",
          "The custom Browse preset could not be deleted."
        );
        this.#capabilities.ui.announcer.announce("The custom preset could not be deleted.", {
          priority: "assertive"
        });
      }
    }
    #recordError(error, code, message) {
      this.#capabilities.diagnostics?.record({
        category: "FEATURE",
        code,
        error,
        message,
        severity: "WARN"
      });
    }
    #mountStyle() {
      if (this.#style?.isConnected) return;
      const existing = this.#document.querySelector('style[data-flt-basic-owned="true"]');
      if (existing) {
        this.#style = existing;
        return;
      }
      const style = this.#document.createElement("style");
      style.dataset.fltBasicOwned = "true";
      style.textContent = `
.flt-basic-section { border: 1px solid var(--flt-border); border-radius: 7px; padding: 6px; margin-bottom: 5px; background: color-mix(in srgb, var(--flt-surface) 82%, transparent); }
.flt-basic-section-title { margin: 0 0 5px; font-size: 12px; }
.flt-basic-actions { display: flex; flex-wrap: wrap; gap: 4px; }
.flt-basic-subsection { margin-top: 6px; }
.flt-basic-saved-term { display: flex; flex-wrap: wrap; gap: 4px; align-items: flex-start; margin-top: 3px; }
.flt-basic-saved-term > span { flex: 1 1 100%; min-width: 0; overflow-wrap: anywhere; }
.flt-basic-card-chips { display: inline-flex; flex-wrap: wrap; gap: 3px; align-items: center; margin-inline-start: 4px; vertical-align: middle; }
.flt-basic-card-chips .flt-button, .flt-basic-card-chips .flt-card-chip { height: auto; min-height: 0; margin: 0; padding: 1px 5px; border-radius: 5px; font-size: 9px; line-height: 1.2; }
.flt-basic-filter-chips { position: fixed; left: 12px; bottom: 16px; z-index: 2147482990; display: flex; flex-wrap: wrap; align-items: center; gap: 5px; max-width: min(460px, calc(100vw - 88px)); padding: 6px 8px; border: 1px solid var(--flt-border); border-radius: 10px; background: color-mix(in srgb, var(--flt-background) 92%, transparent); color: var(--flt-text); box-shadow: 0 8px 24px rgb(0 0 0 / 35%); }
.flt-basic-filter-chips-title { color: var(--flt-muted); font-size: 9px; font-weight: 800; letter-spacing: .04em; text-transform: uppercase; }
.flt-loaded-page { margin-top: 28px; padding-top: 16px; border-top: 1px solid color-mix(in srgb, var(--flt-border) 80%, transparent); }
.flt-basic-scroll-sentinel { margin: 20px 0 12px; min-height: 36px; border: 1px dashed var(--flt-border); border-radius: 7px; padding: 7px; color: var(--flt-muted); }
.flt-basic-exact-time { margin-inline-start: 5px; color: var(--flt-muted); font-size: 12px; }
.flt-basic-visited { text-decoration: underline double; }
.flt-basic-shared-interest { font-weight: 700; }
.flt-basic-picture-next { margin: 6px; }
.flt-basic-page-tools { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; margin: 8px 0; padding: 7px; border: 1px solid var(--flt-border); border-radius: 7px; background: color-mix(in srgb, var(--flt-background) 90%, transparent); color: var(--flt-text); }
.flt-basic-page-tools > .flt-input { flex: 1 1 150px; width: auto; min-width: 0; }
.flt-basic-page-status { flex: 1 1 auto; color: var(--flt-muted); font-size: 11px; }
.flt-basic-bookmark-filtered { display: none !important; }
[data-flt-card-selected="true"] { outline: 2px solid var(--flt-focus) !important; outline-offset: 3px; }
.flt-basic-native-preview .flt-state-hidden { display: revert !important; visibility: visible !important; }
.flt-basic-native-preview .flt-state-dimmed { opacity: 1 !important; }
.flt-basic-native-preview .flt-state-highlighted { outline-color: transparent !important; }
.flt-basic-native-preview .flt-media-blurred { filter: none !important; }
.flt-basic-native-preview .flt-media-hidden { visibility: visible !important; }
.flt-basic-compact .flt-basic-section { padding: 4px; margin-bottom: 3px; }
.flt-basic-high-contrast .flt-panel, .flt-basic-high-contrast .flt-basic-section { border-width: 2px; }
`;
      this.#document.head.append(style);
      this.#style = style;
    }
  };
  async function installBasic(coreSurface, options) {
    if (!coreSurface?.registerProduct) throw new TypeError("Compatible FL Tools Core is required");
    await coreSurface.whenReady;
    const registration = await coreSurface.registerProduct({
      features: COMPONENTS,
      manifest: BASIC_MANIFEST,
      updateProvider: options.updateProvider
    });
    const product = new BasicProduct({ ...options, registration });
    await product.start();
    return Object.freeze({ product, registration });
  }

  // scripts/userscript-entry.js
  var pageWindow = globalThis.unsafeWindow ?? globalThis.window ?? globalThis;
  var productId = "basic";
  var report = (error) => {
    pageWindow.dispatchEvent(
      new pageWindow.CustomEvent("fltools:install-error", {
        detail: Object.freeze({
          message: error instanceof Error ? error.message : String(error),
          productId
        })
      })
    );
  };
  try {
    installCore(pageWindow, {
      document: pageWindow.document,
      version: "0.0.8",
      window: pageWindow
    });
    void installBasic(pageWindow.FLTools, {
      changelog: {
        summary: [
          "Keeps every menu fully inside the window after launcher dragging or resizing.",
          "Preserves the launcher position when the menu closes."
        ],
        version: "0.0.8"
      },
      document: pageWindow.document,
      iconUrl: "https://raw.githubusercontent.com/Typical-Bits/fl-tools-basic/main/assets/badges/basic-128.png",
      installUrl: "https://github.com/Typical-Bits/fl-tools-basic/raw/refs/heads/main/FL-Tools-Basic.user.js",
      releaseUrl: "https://github.com/Typical-Bits/fl-tools-basic/releases",
      updateUrl: "https://github.com/Typical-Bits/fl-tools-basic/raw/refs/heads/main/FL-Tools-Basic.user.js",
      version: "0.0.8",
      window: pageWindow
    }).catch(report);
  } catch (error) {
    report(error);
  }
})();
